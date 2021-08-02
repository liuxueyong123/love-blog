import { AxiosRequestConfig } from 'axios';

export const getUserInfoApi: AxiosRequestConfig = {
  url: '/userInfo',
  method: 'get',
};

export const getRecentArticleApi: AxiosRequestConfig = {
  url: '/article/recent',
  method: 'get',
};

// post
export const getRecentPostApi: AxiosRequestConfig = {
  url: '/post/recent',
  method: 'get',
};

export const postTogglePostLikeApi: AxiosRequestConfig = {
  url: '/post/toggle-like',
  method: 'post',
};

export const getPostsApi: AxiosRequestConfig = {
  url: '/post/posts',
  method: 'get',
};

export const getPostTypesApi: AxiosRequestConfig = {
  url: '/post/types',
  method: 'get',
};

export const postPostCommentApi: AxiosRequestConfig = {
  url: '/post/comment',
  method: 'post',
};

export const postCreatePostApi: AxiosRequestConfig = {
  url: '/post/create',
  method: 'post',
};

export const putUploadPostImageApi: AxiosRequestConfig = {
  url: '/post/upload/image',
  method: 'put',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
