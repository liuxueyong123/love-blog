import { Context, Next } from 'koa'

const authMiddleWare = async (ctx: Context, next: Next) => {
  const cookie = ctx.cookies.get('lxyAndTsy')

  if (!cookie) {
    ctx.status = 401
    ctx.body = {
      error: 'Not login yet!'
    }
    return
  }

  const parsedCookie = JSON.parse(cookie)
  ctx.state.user = {
    id: parsedCookie.id,
    name: decodeURIComponent(parsedCookie.name),
    gender: parsedCookie.gender
  }

  await next()
}

export default authMiddleWare
