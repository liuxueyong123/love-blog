import Koa from 'koa'
import { publicRouters, privateRouters } from './src/router/apiRouter'
import viewRouter from './src/router/viewRouter'
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
  .use(async (ctx, next) => {
    const cookie = ctx.cookies.get('lxyAndTsy') as string
    try {
      const parsedCookie = JSON.parse(cookie)
      console.log(parsedCookie)
    } catch {}

    ctx.status = 401
    ctx.body = {}
    // await next()
  })
  .use(privateRouters)

app.listen(port, async () => {
  console.log(`Http Server is running on ${port}`)
})
