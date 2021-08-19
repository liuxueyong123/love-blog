import Koa from 'koa'
import path from 'path'
import KoaBody from 'koa-body'
import koaLogger from 'koa-logger'
import { publicRouters, privateRouters } from './src/router/apiRouter'
import viewRouter from './src/router/viewRouter'
import authMiddleWare from './src/middlewares/auth'

const app = new Koa()
const port = 8081

app
  .use(koaLogger())
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      console.log(err)
    }
  })
  .use(
    KoaBody({
      multipart: true,
      formidable: {
        // 上传目录
        uploadDir: path.join(__dirname, 'public'),
        // 保留文件扩展名
        keepExtensions: true
      }
    })
  )
  .use(viewRouter.routes())
  .use(publicRouters)
  .use(authMiddleWare)
  .use(privateRouters)

app.listen(port, async () => {
  console.log(`Http Server is running on ${port}`)
})
