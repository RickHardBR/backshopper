import {
  Request,
  Response
} from 'express';

import { PurchasesCase } from './PurchasesCase';

import { PurchaseRepository } from '../../repositories/Purchase-repository';

import { DataListType } from "./types"

export class PurchaseController {
  async purchase(req: Request, res: Response) {
    const {email} = req.params
    const delivey_date = req.query.date as string

    const listPurchases = req.body.map((purchase: DataListType) => {
      const {
        id_product,
        qty_product_selected
      } = purchase 

      return {id_product, qty_product_selected}
    });


    const purchaseRepository = new PurchaseRepository()
    const purchaseCase = new PurchasesCase(purchaseRepository)

    await purchaseCase.purchase(email, {
      delivey_date,
      listPurchases
    })

    return res.status(200).json({message:'Compra efetuada com sucesso!'})
  }
}