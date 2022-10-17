import {
  Request,
  Response
} from 'express';

import { PurchasesCase } from './PurchasesCase';

import { PurchaseRepository } from '../../repositories/Purchase-repository';

export class PurchaseController {
  async purchase(req: Request, res: Response) {
    const {email} = req.params
    const delivey_date = req.query.date as string
    
    const {
      id_product,
      qty_product_selected
    } = req.body


    const purchaseRepository = new PurchaseRepository()
    const purchaseCase = new PurchasesCase(purchaseRepository)

    await purchaseCase.purchase(email, {
      id_product,
      qty_product_selected,
      delivey_date,
    })

    return res.status(200).json({message:'Compra efetuada com sucesso!'})
    // await BaseDatabase.destroyConnection()
  }
}
