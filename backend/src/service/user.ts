import UserModel from '../model/user'

export const getUserById = async (userId: number) => {
  const user = await UserModel.findOne({
    where: {
      id: userId
    }
  })

  return user
}
