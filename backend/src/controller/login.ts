import koaRouter, { Joi } from 'koa-joi-router'
import config from '../../config'
import * as exception from '../extension/exception'
import { getUserByPassword } from '../service/user'

const router = koaRouter()
router.prefix('/api')

// 提交登录
router.route({
  method: 'post',
  path: '/login',
  validate: {
    type: 'json',
    body: {
      account: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  handler: async (ctx) => {
    const { account, password } = ctx.request.body
    const user = await getUserByPassword(account, password)

    if (!user) {
      exception.wrongPassword(ctx)
      return
    }

    ctx.cookies.set(
      'lxyAndTsy',
      JSON.stringify({
        id: user.id,
        account: user.account,
        name: encodeURIComponent(user.name),
        gender: user.gender,
        auth: config.authSecret
      }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 7, // cookie有效时长
        overwrite: false // 是否允许重写
      }
    )

    ctx.status = 200
    ctx.body = {
      id: user.id,
      name: user.name,
      gender: user.gender
    }
  }
})

router.route({
  method: 'post',
  path: '/lxy/test',
  handler: async (ctx) => {
    console.log('ctx.request.body', ctx.request.body)

    ctx.body = {
      attachments: [
        {
          color: '#0976fd',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: "*Why is my new token expired?*\nI wants to know where you'd like to take the Paper Company investors to dinner tonight."
              }
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Share with channel',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '👍',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '👎',
                    emoji: true
                  },
                  value: 'button_click'
                }
              ]
            }
          ]
        },
        {
          color: '#0976fd',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: "*Why is my new token expired?*\nI wants to know where you'd like to take the Paper Company investors to dinner tonight."
              }
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Share with channel',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '👍',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '👎',
                    emoji: true
                  },
                  value: 'button_click'
                }
              ]
            }
          ]
        },
        {
          color: '#0976fd',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: "*Why is my new token expired?*\nI wants to know where you'd like to take the Paper Company investors to dinner tonight."
              }
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Share with channel',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '👍',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '👎',
                    emoji: true
                  },
                  value: 'button_click'
                }
              ]
            }
          ]
        },
        {
          color: '#d8d1c9',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '*Not helpful?Try one of the options below*'
              }
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Ask a Channel',
                    emoji: true
                  },
                  value: 'button_click'
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Manage FAQs',
                    emoji: true
                  },
                  value: 'button_click'
                }
              ]
            }
          ]
        }
      ]
    }
    ctx.status = 200
  }
})

router.route({
  method: 'post',
  path: '/lxy/event',
  handler: async (ctx) => {
    console.log('ctx.request.body', ctx.request.body)

    const { challenge } = ctx.request.body

    ctx.body = {
      challenge
    }
    ctx.status = 200
  }
})

export default router
