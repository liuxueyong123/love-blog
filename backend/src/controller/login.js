const koaRouter = require('koa-joi-router')
const UserModel = require('../model/user')
const Joi = koaRouter.Joi

const router = koaRouter()
router.prefix('/api')

router.route({
  method: 'post',
  path: '/login',
  validate: {
    type: 'json',
    body: {
      account: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  handler: async (ctx) => {
    const { account, password } = ctx.request.body
    const user = await UserModel.findOne({
      where: {
        account,
        password
      }
    });

    if(!user) {
      ctx.status = 400
      ctx.body = {
        error : 'Account and password is not matched'
      }
      return
    }

    ctx.cookies.set(
      'lxyAndTsy',
      JSON.stringify({
        id: user.id,
        account: user.account,
        name: user.name,
        gender: user.gender
      }),
      {
        maxAge: 1000 * 60  * 60 * 24 * 7, // cookie有效时长
        overwrite: false  // 是否允许重写
      }
    )

    ctx.status = 200
    ctx.body = {}
  },
})

module.exports = router
