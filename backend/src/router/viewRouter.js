const send = require('koa-send')
const Router = require('koa-router')
const path = require('path')

const indexPage = async (ctx) => {
  await send(ctx, path.resolve('../website/dist/index.html'), { root: '/' })
}

const router = new Router()

router.get('/page/(.*)', indexPage)

module.exports = router
