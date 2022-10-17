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
      id_product,
      qty_product_selected,
      delivey_date,
    } = request
    
    if(!delivey_date || !qty_product_selected){
      throw new ErrorObjInvalid()
    }

    const user = await this.purchaseModel.findUser(email)

    if(!user){
      throw new ErrorEmailNotFound(email)
    }

    const product = await this.purchaseModel.findProduct(id_product);

    if(qty_product_selected > product.qty_stock){
      throw new ErrorQtyStock(product.product_name)
    }
    
    if(qty_product_selected <= 0){
      request.qty_product_selected = 1
    }
  
    await this.purchaseModel.purchase(email, request)

  }
}