import { Context } from 'koa'

export const userNotExist = (ctx: Context) => {
  ctx.status = 400
  ctx.body = {
    error: 'user is not exist'
  }
}

export const wrongPassword = (ctx: Context) => {
  ctx.status = 400
  ctx.body = {
    error: 'Account and password is not matched'
  }
}

export const notLogin = (ctx: Context) => {
  ctx.status = 401
  ctx.body = {
    error: 'Not login yet!'
  }
}
