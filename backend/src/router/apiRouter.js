const compose = require('koa-compose');
const userRouter = require('../controller/user');

const routers = compose([
  userRouter.middleware(),
])

module.exports = routers