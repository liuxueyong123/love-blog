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

export const postNotExist = (ctx: Context) => {
  ctx.status = 400
  ctx.body = {
    error: 'post is not exist'
  }
}

export const postTypeNotExist = (ctx: Context) => {
  ctx.status = 400
  ctx.body = {
    error: 'post type is not exist'
  }
}

export const uploadImageFailed = (ctx: Context) => {
  ctx.status = 500
  ctx.body = {
    error: 'upload image failed'
  }
}
