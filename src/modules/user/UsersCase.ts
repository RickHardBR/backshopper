import { IUserTypeRequest } from './types';

import { verifyEmail } from '../../utils/verifyEmail';

import { IUsersModel } from '../../models/UsersModel';

import {
  ErrorObjInvalid,
  ErrorInvalidEmail,
  ErrorExistEmail
} from '../../errors/UserErrors';

export class UserCase{
  constructor(
    private readonly userModel: IUsersModel
  ){}

  async create(request: IUserTypeRequest){
    const { email, first_name, last_name } = request
    
    if(!email.trim() || !first_name.trim() || !last_name.trim()){
      throw new ErrorObjInvalid()
    }

    if(!verifyEmail(email)){
      throw new ErrorInvalidEmail(email)
    }

    const user = await this.userModel.findEmail(email)

    if(user){
      throw new ErrorExistEmail(email)
    }
    
    await this.userModel.create(request)

  }
}
