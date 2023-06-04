import config from '../../config'
import ApiError from '../../eroors/apiErrorHandler'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generatedUserId()
  user.id = id
  if (!user.password) {
    user.password = config.default_user_Password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400,'Failed to create user')
  }
  return createdUser
}

export const UserService= {
  createUser,
}
