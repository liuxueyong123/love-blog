import axios from 'axios'
import config from '../../config'

export const sendMessageToWx = (msg: string) => {
  axios.request({
    method: 'POST',
    url: 'http://wxpusher.zjiecode.com/api/send/message',
    data: {
      ...config.wxPusher,
      content: msg
    }
  })
}
