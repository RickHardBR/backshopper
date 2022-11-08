import { Router } from 'express'

import { PurchaseController } from '../modules/purchase/PurchaseController'

export const purchaseRouter = Router()

const purchaseController = new PurchaseController()

//* Query date para fucionar /:email?date="10/10/2022"
//* na hora da chamada do endpoint
purchaseRouter.post('/:email', purchaseController.purchase)
