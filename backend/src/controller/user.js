const koaRouter = require('koa-joi-router')
const UserModel = require('../model/user')

const router = koaRouter()
router.prefix('/api')

router.route({
  method: 'get',
  path: '/user',
  handler: async (ctx) => {
    const users = await UserModel.findAll()

    ctx.body = users
    ctx.status = 200
  }
})

module.exports = router
