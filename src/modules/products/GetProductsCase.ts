import { IProductsModel } from '../../models/ProductsModel'

export class GetProductsCase {
  constructor(private productsModel: IProductsModel) {}

  async getAllProducts(pageNumber: number) {
    const products = await this.productsModel.getAllProducts(pageNumber)
    return products
  }
}
