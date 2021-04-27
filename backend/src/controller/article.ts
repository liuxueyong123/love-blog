import koaRouter from 'koa-joi-router'
import { getRecentArticle } from '../service/article'

const router = koaRouter()
router.prefix('/api/article')

// 获取首页最近文章
router.route({
  method: 'get',
  path: '/recent',
  handler: async (ctx) => {
    const res = await getRecentArticle(ctx.state.user.id)

    ctx.body = res
  }
})

export default router
