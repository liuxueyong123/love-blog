const compose = require('koa-compose');
const userRouter = require('../controller/user');
const loginRouter = require('../controller/login')

const publicRouters = compose([
  loginRouter.middleware(),
])

const privateRouters = compose([
  userRouter.middleware(),
])

module.exports = {
  publicRouters,
  privateRouters
}