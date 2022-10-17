import {
  Request,
  Response
} from 'express';

import { UserCase } from './UsersCase';

import { UserRepository } from '../../repositories/Users-repository';

export class UserController {
  async create(req: Request, res: Response) {
    const { first_name, last_name, email } = req.body

    const userRepository = new UserRepository()
    const userCase = new UserCase(userRepository)
    
    await userCase.create({
      first_name,
      last_name,
      email
    })

    return res.status(201).json({message: `Usuário: ${first_name} ${last_name} Registrado com sucesso`})
    // await BaseDatabase.destroyConnection()
  }
}
