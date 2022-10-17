import { Router } from 'express';

import { PurchaseController } from '../modules/purchase/PurchaseController';

export const purchaseRouter = Router()

const purchaseController = new PurchaseController();


purchaseRouter.post('/:email', purchaseController.purchase)

