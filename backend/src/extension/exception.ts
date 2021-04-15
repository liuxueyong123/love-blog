import { Context } from 'koa'

export const userNotExist = (ctx: Context) => {
  ctx.status = 400
  ctx.body = {
    error: 'user is not exist'
  }
}
