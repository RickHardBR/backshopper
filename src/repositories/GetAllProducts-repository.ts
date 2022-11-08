import { BaseDatabase } from '../data/Database';

import { IProductsModel } from '../models/ProductsModel';

export class GetAllProductsRepository
  extends BaseDatabase
  implements IProductsModel
{
  private TABLE_NAME = 'Shopper_Product'

  async getAllProducts(
    page: number,
    nameProduct?: string,
  ) {

    const allProducts = await BaseDatabase.getConnection(this.TABLE_NAME)
      .limit(10)
      .offset((page - 1) * 10)
      .orderBy('product_name', 'asc')

    return allProducts
  }
}
