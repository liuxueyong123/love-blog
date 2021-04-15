import Koa from 'koa'
import { publicRouters, privateRouters } from './src/router/apiRouter'
import viewRouter from './src/router/viewRouter'
import authMiddleWare from './src/middlewares/auth'

const app = new Koa()
const port = 8081

app
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      console.log(err)
    }
  })
  .use(viewRouter.routes())
  .use(publicRouters)
  .use(authMiddleWare)
  .use(privateRouters)

app.listen(port, async () => {
  console.log(`Http Server is running on ${port}`)
})
