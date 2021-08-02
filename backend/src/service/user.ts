import { UserModel } from '../model'

// 通过用户 id 获取用户信息
export const getUserById = async (userId: number) => {
  const user = await UserModel.findOne({
    where: {
      id: userId
    }
  })

  return user
}

// 通过账号和密码获取用户信息
export const getUserByPassword = async (account: string, password: string) => {
  const user = await UserModel.findOne({
    where: {
      account,
      password
    }
  })

  return user
}
