import koaRouter from 'koa-joi-router'

const router = koaRouter()
router.prefix('/api')

router.route({
  method: 'get',
  path: '/userInfo',
  handler: async (ctx) => {
    ctx.body = ctx.state.user
    ctx.status = 200
  }
})

export default router
