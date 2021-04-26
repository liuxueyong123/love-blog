import { UserModel } from '../model'

export const getUserById = async (userId: number) => {
  const user = await UserModel.findOne({
    where: {
      id: userId
    }
  })

  return user
}

export const getUserByPassword = async (account: string, password: string) => {
  const user = await UserModel.findOne({
    where: {
      account,
      password
    }
  })

  return user
}
