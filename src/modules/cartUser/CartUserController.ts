import { Request, Response } from 'express';

import { CartUserCase } from './CartUserCase';

import { CartuserRepository } from '../../repositories/CartUser-repository';

export class CartUserController {
  async get(req: Request, res: Response) {
    
    const {
      userEmail
    } = req.params;

    const dateFilter = req.query.date as string;

    const cartUserRepository = new CartuserRepository()
    const cartUserCase = new CartUserCase(cartUserRepository)

    const cartUser = await cartUserCase.get(userEmail, dateFilter)

    return res.status(200).json(cartUser)
    // await BaseDatabase.destroyConnection()
  }
}
