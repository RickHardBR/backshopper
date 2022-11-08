import { UsersModelDataType } from './types'

export interface IUsersModel {
  create: (request: UsersModelDataType) => Promise<Boolean | void>
  findEmail: (email: string) => Promise<boolean>
}
