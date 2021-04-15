import compose from 'koa-compose'
import userRouter from '../controller/user'
import loginRouter from '../controller/login'

export const publicRouters = compose([
  loginRouter.middleware()
])

export const privateRouters = compose([
  userRouter.middleware()
])
