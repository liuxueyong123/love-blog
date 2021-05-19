import { Context, Next } from 'koa'
import config from '../../config'
import * as exception from '../extension/exception'

const authMiddleWare = async (ctx: Context, next: Next) => {
  const cookie = ctx.cookies.get('lxyAndTsy')

  if (!cookie) {
    exception.notLogin(ctx)
    return
  }

  const parsedCookie = JSON.parse(cookie)

  if (!parsedCookie || !parsedCookie.auth || parsedCookie.auth !== config.authSecret) {
    exception.notLogin(ctx)
    return
  }

  ctx.state.user = {
    id: parsedCookie.id,
    name: decodeURIComponent(parsedCookie.name),
    gender: parsedCookie.gender
  }

  await next()
}

export default authMiddleWare
