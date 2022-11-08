import { Router } from 'express'

import { GetAllProductsController } from '../modules/products/GetProductsController'

export const productsRouter = Router()

const getAllProductsController = new GetAllProductsController()

productsRouter.get('/all/:pageNumber', getAllProductsController.get)
