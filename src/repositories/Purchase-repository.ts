import { BaseDatabase } from '../data/Database';

import { generateId } from '../utils/generateId';

import {
  IPurchaseModelData,
  IPurchaseModel
} from '../models/PurchaseModel';

export class PurchaseRepository extends BaseDatabase implements IPurchaseModel {
  private TABLES = {
    product: 'Shopper_Product',
    purchase: 'Shopper_Purchase',
    user: 'Shopper_User'
  }

  async findUser (email: string){
    const [user] = await BaseDatabase.getConnection()
    .from(this.TABLES.user)
    .where('email', email)

    return user
  }

  async findProduct (idProduct: number){
    const [product] = await BaseDatabase.getConnection(this.TABLES.product)
      .where('id_product', idProduct)

      return product
  }

  async purchase(email: string, data: IPurchaseModelData) {
    
    const user = await this.findUser(email);
    const product = await this.findProduct(data.id_product);
  
    //* Inserir compra do produto
    await BaseDatabase.getConnection(this.TABLES.purchase)
      .insert({
        id_purchase: generateId(),
        product_name: product.product_name,
        price: product.price,
        qty_product_selected: data.qty_product_selected,
        total_price: (product.price * data.qty_product_selected),
        buy_date: new Date(),
        delivey_date: new Date(data.delivey_date + "T00:00"),
        id_purchase_ref: user.id_user,
      })


      // Atualizar quantidade do stock do produto
      await BaseDatabase.getConnection(this.TABLES.product)
      .update('qty_stock', product.qty_stock - data.qty_product_selected)
      .where('id_product', product.id_product)
  }
}
