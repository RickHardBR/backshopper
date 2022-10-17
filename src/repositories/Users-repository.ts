import { BaseDatabase } from '../data/Database';

import { generateId } from '../utils/generateId'; 

import { 
  IUsersModelData,
  IUsersModel
} from '../models/UsersModel';

export class UserRepository extends BaseDatabase
implements IUsersModel{
  
  private TABLE_NAME: string = 'Shopper_User';

  async findEmail (email: string) {
    const [user] = await BaseDatabase.getConnection(this.TABLE_NAME)
    .where("email", email)

    return !!user
  }


  async create(data: IUsersModelData){
    await BaseDatabase.getConnection(this.TABLE_NAME)
    .insert({id_user: generateId(), ...data})
  }
}