import axios from 'axios';
import { Toast } from 'vant';

const initConfig = () => {
  // axios.defaults.baseURL = ''  //正式
  axios.defaults.baseURL = '/api'; // 本地路径

  // post请求头
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  // 设置超时
  axios.defaults.timeout = 10000;
};

const initInterceptors = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let toast: any;
  axios.interceptors.request.use(
    config => {
      toast = Toast({
        type: 'loading',
        message: 'loading',
        duration: 0,
        className: 'my-toast',
      });

      return config;
    },
    error => Promise.reject(error),
  );

  axios.interceptors.response.use(
    response => {
      toast && toast.clear();

      if (response.status === 200) {
        return Promise.resolve(response);
      }
      return Promise.reject(response);
    },
    error => {
      toast && toast.clear();

      if (error.response.status === 401) {
        location.href = 'http://' + location.host + '/page/login';
      }

      const message = error.response.data.error || 'Opps...';

      Toast({
        type: 'fail',
        message,
        duration: 1000,
        className: 'my-toast',
      });

      throw error;
    },
  );
};

initConfig();
initInterceptors();

const useAxios = () => {
  return axios;
};

export default useAxios;
