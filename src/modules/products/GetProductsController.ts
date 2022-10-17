import {
  Request,
  Response
} from 'express';

import { GetProductsCase } from '././GetProductsCase';

import { GetAllProductsRepository } from '../../repositories/GetAllProducts-repository';

export class GetAllProductsController {
  async get(req: Request, res: Response) {
    const { page } =req.params;

    const nameProduct = req.query.nameProduct as string;

    const getAllProductsRepository = new GetAllProductsRepository()
    const getProductsCase = new GetProductsCase(getAllProductsRepository)

    const products = await getProductsCase.getAllProducts(Number(page), nameProduct)

    return res.status(200).json(products)
    // await BaseDatabase.destroyConnection()
  }
}