import axios from 'axios'
import { Toast } from 'vant'
import { useRouter, Router } from 'vue-router'

const initConfig = () => {
  // axios.defaults.baseURL = ''  //正式
  axios.defaults.baseURL = '/api' // 本地路径

  // post请求头
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // 设置超时
  axios.defaults.timeout = 10000
}

const initInterceptors = (router: Router) => {
  axios.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
  )

  axios.interceptors.response.use(
    response => {
      if (response.status === 200) {
        return Promise.resolve(response)
      }
      return Promise.reject(response)
    },
    error => {
      if (error.response.status === 401) {
        router.push('/login')
      }

      const message = error.response.data.error || 'Opps...'

      Toast({
        type: 'fail',
        message,
        duration: 0,
        className: 'my-toast',
      })

      throw error
    },
  )
}

const useAxios = () => {
  const router = useRouter()

  initConfig()
  initInterceptors(router)

  return axios
}

export default useAxios
