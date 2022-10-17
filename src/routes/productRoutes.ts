import { Router } from 'express';

import { GetAllProductsController } from '../modules/products/GetProductsController';

export const produtcsRouter = Router()

const getAllProductsController = new GetAllProductsController();

produtcsRouter.get('/all/:page', getAllProductsController.get)