import compose from 'koa-compose'
import userRouter from '../controller/user'
import loginRouter from '../controller/login'
import postRouter from '../controller/post'
import articleRouter from '../controller/article'

export const publicRouters = compose([
  loginRouter.middleware()
])

export const privateRouters = compose([
  userRouter.middleware(),
  postRouter.middleware(),
  articleRouter.middleware()
])
