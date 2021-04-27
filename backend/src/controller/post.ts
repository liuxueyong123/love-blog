import koaRouter, { Joi } from 'koa-joi-router'
import { getRecentPost, togglePostLike } from '../service/post'

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

export default router
