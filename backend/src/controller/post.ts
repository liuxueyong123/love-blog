import koaRouter, { Joi } from 'koa-joi-router'
import { getRecentPost, togglePostLike, getPosts } from '../service/post'

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
    const { postId } = ctx.request.body

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

export default router
