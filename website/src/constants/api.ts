import { AxiosRequestConfig } from 'axios';

export const getUserInfoApi: AxiosRequestConfig = {
  url: '/userInfo',
  method: 'get',
};

export const getRecentPostApi: AxiosRequestConfig = {
  url: '/post/recent',
  method: 'get',
};

export const postTogglePostLikeApi: AxiosRequestConfig = {
  url: '/post/toggle-like',
  method: 'post',
};
