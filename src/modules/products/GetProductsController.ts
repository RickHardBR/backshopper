import {
  Request,
  Response
} from 'express';

import { GetProductsCase } from '././GetProductsCase';

import { GetAllProductsRepository } from '../../repositories/GetAllProducts-repository';

export class GetAllProductsController {
  async get(req: Request, res: Response) {
    const { pageNumber } =req.params;

    const getAllProductsRepository = new GetAllProductsRepository()
    const getProductsCase = new GetProductsCase(getAllProductsRepository)

    const products = await getProductsCase.getAllProducts(Number(pageNumber))

    return res.status(200).json(products)
  }
}