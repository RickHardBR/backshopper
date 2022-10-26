import { RequestType } from './types';

import { IPurchaseModel } from '../../models/PurchaseModel';

import {
  ErrorObjInvalid,
  ErrorQtyStock,
  ErrorEmailNotFound
} from '../../errors/PurchaseErrors';

export class PurchasesCase{
  constructor(
    private purchaseModel: IPurchaseModel
  ) {}

  async purchase(email: string, request:RequestType){
    let {
      delivey_date,
      listPurchases
    } = request
    
    const user = await this.purchaseModel.findUser(email)

    if(!user){
      throw new ErrorEmailNotFound(email)
    }

    if(!delivey_date){
      throw new ErrorObjInvalid()
    }

    const soldOutProducts = await this.purchaseModel.soldOutProducts(listPurchases)

    if ( soldOutProducts.length > 0 ) {
      throw new ErrorQtyStock(`${soldOutProducts.map((item) =>
        soldOutProducts.length > 1 ? `${item.product_name}`  : item.product_name
      )}`)
    }
  
    await this.purchaseModel.purchase(email, request)
  }
}