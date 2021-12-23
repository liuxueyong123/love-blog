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

router.route({
  method: 'post',
  path: '/lxy/test',
  handler: async (ctx) => {
    console.log('ctx.request.query', ctx.request.query)
    console.log('ctx.request.body', ctx.request.body)
    ctx.body = {
      name: 'lxy'
    }
    ctx.status = 200
  }
})

export default router
