import koaRouter, { Joi } from 'koa-joi-router'
import OSS from 'ali-oss'
import config from '../../config'
import { getRecentPost, togglePostLike, getPosts, createPostComment, getPostById, getPostTypes, getPostTypeById, createPost } from '../service/post'
import * as exception from '../extension/exception'
import { sendMessageToWx } from '../extension/wxMessage'

const router = koaRouter()
router.prefix('/api/post')

// 获取首页最近博客
router.route({
  method: 'get',
  path: '/recent',
  handler: async (ctx) => {
    const res = await getRecentPost(ctx.state.user.id)

    ctx.body = res
  }
})

// 切换博客喜欢状态
router.route({
  method: 'post',
  path: '/toggle-like',
  validate: {
    type: 'json',
    body: {
      postId: Joi.number().required()
    }
  },
  handler: async (ctx) => {
    const postId = Number(ctx.request.body.postId)

    const postRes = await getPostById(postId)

    if (!postRes) {
      exception.postNotExist(ctx)
      return
    }

    const res = await togglePostLike(postId, ctx.state.user.id)

    ctx.body = res
  }
})

// 博客页加载博客
router.route({
  method: 'get',
  path: '/posts',
  validate: {
    query: {
      page: Joi.number().required(),
      timeOrder: Joi.string().valid('DESC', 'ASC').required(),
      typeId: Joi.number().default(0)
    }
  },
  handler: async (ctx) => {
    const timeOrder = ctx.request.query.timeOrder as string
    const typeId = Number(ctx.request.query.typeId)
    const page = Number(ctx.request.query.page)

    const res = await getPosts(ctx.state.user.id, page, timeOrder, typeId)

    ctx.body = res
  }
})

// 获取所有的 post 类型
router.route({
  method: 'get',
  path: '/types',
  handler: async (ctx) => {
    const res = await getPostTypes()

    ctx.body = res
  }
})

// 提交博客评论
router.route({
  method: 'post',
  path: '/comment',
  validate: {
    type: 'json',
    body: {
      postId: Joi.number().required(),
      comment: Joi.string().required()
    }
  },
  handler: async (ctx) => {
    const userId = ctx.state.user.id
    const postId = Number(ctx.request.body.postId)
    const comment = ctx.request.body.comment as string

    const postRes = await getPostById(postId)

    if (!postRes) {
      exception.postNotExist(ctx)
      return
    }

    const res = await createPostComment(userId, postId, comment)

    sendMessageToWx(`${ctx.state.user.name}刚刚发表了一条评论，快打开应用查看吧！`)

    ctx.body = res
  }
})

// 创建新博客
router.route({
  method: 'post',
  path: '/create',
  validate: {
    type: 'json',
    body: {
      typeId: Joi.number().required(),
      content: Joi.string().required(),
      imgList: Joi.array()
    }
  },
  handler: async (ctx) => {
    const userId = ctx.state.user.id
    const typeId = Number(ctx.request.body.typeId)
    const content = ctx.request.body.content as string
    const imgList = ctx.request.body.imgList

    const postTypeRes = await getPostTypeById(typeId)

    if (!postTypeRes) {
      exception.postTypeNotExist(ctx)
      return
    }

    const res = await createPost(userId, typeId, content, imgList)

    sendMessageToWx(`${ctx.state.user.name}刚刚发表了一篇博客，快打开应用查看吧！`)

    ctx.body = res
  }
})

// 上传博客图片
router.route({
  method: 'put',
  path: '/upload/image',
  handler: async (ctx) => {
    const file = (ctx.request as any).files.file
    const filename = `${Date.now()}-${file.name}`

    const client = new OSS(config.oss)

    try {
      await client.put(`/images/post/${filename}`, file.path)
    } catch (e) {
      exception.uploadImageFailed(ctx)
      return
    }

    ctx.body = {
      filename
    }
  }
})

export default router
