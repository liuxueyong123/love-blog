import { inject } from 'vue';
import { USER_INFO_CONTEXT, SET_USER_INFO_CONTEXT } from './constant';
import { UserInfoContext, SetUserInfoContext } from './model';

export const useUserInfo = () => {
  const userInfo: UserInfoContext | undefined = inject(USER_INFO_CONTEXT);
  const setUserInfo: SetUserInfoContext | undefined = inject(SET_USER_INFO_CONTEXT);

  if (!userInfo) {
    throw new Error('userInfo can only be used under App!');
  }

  if (!setUserInfo) {
    throw new Error('setUserInfo can only be used under App!');
  }

  return {
    userInfo,
    setUserInfo,
  };
};
