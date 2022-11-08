import { BaseDatabase } from '../data/Database'

import { generateId } from '../utils/generateId'

import { IPurchaseModel } from '../models/PurchaseModel'

import {
  ProductTypeModel,
  PurchasedProductType,
  PurchaseModelDataType,
  ListPurchasesType
} from '../models/types'

export class PurchaseRepository extends BaseDatabase implements IPurchaseModel {
  private TABLES = {
    product: 'Shopper_Product',
    purchase: 'Shopper_Purchase',
    user: 'Shopper_User'
  }

  async findUser(email: string) {
    const [user] = await BaseDatabase.getConnection()
      .from(this.TABLES.user)
      .where('email', email)

    return user
  }

  async soldOutProducts(purchaseProducts: ListPurchasesType[]) {
    const products: ProductTypeModel[] = []
    let soldOutProducts: ProductTypeModel[] = []

    for (let i = 0; i < purchaseProducts.length; i++) {
      const [product] = await BaseDatabase.getConnection(
        this.TABLES.product
      ).where('id_product', purchaseProducts[i].id_product)
      products.push(product)

      if (purchaseProducts[i].qty_product_selected > products[i].qty_stock) {
        soldOutProducts.push(products[i])
      }
    }

    return soldOutProducts
  }

  async purchase(email: string, data: PurchaseModelDataType) {
    const user = await this.findUser(email)
    let products: ProductTypeModel[] | any = []
    let purchasedProducts: PurchasedProductType[] = []

    for (let i = 0; i < data.listPurchases.length; i++) {
      const [product] = await BaseDatabase.getConnection(
        this.TABLES.product
      ).where('id_product', data.listPurchases[i].id_product)
      products.push(product)

      const mergeObj = { ...product, ...data.listPurchases[i] }
      purchasedProducts.push(mergeObj)
    }

    purchasedProducts.forEach(async item => {
      await BaseDatabase.getConnection(this.TABLES.purchase).insert({
        id_purchase: generateId(),
        id_user_ref: user.id_user,
        id_product: item.id_product,
        qty_product_selected: item.qty_product_selected,
        price: item.price,
        total_price: item.price * item.qty_product_selected,
        buy_date: new Date(),
        delivey_date: new Date(data.delivey_date)
      })
    })

    purchasedProducts.forEach(async item => {
      await BaseDatabase.getConnection(this.TABLES.product)
        .update('qty_stock', item.qty_stock - item.qty_product_selected)
        .where('id_product', item.id_product)
    })
  }
}
