export interface UserInfoContext {
  id: number;
  name: string;
  gender: number;
}

export type SetUserInfoContext = (userInfo: UserInfoContext) => void;
