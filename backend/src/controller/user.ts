import koaRouter from 'koa-joi-router'
import UserModel from '../model/user'

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

export default router
