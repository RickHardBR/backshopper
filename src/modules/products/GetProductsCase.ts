import { IProductsModel } from '../../models/ProductsModel';

export class GetProductsCase {
  constructor(
    private productsModel: IProductsModel
  ){}

  async getAllProducts(page: number, nameProduct: string){
    
    const products = await this.productsModel.getAllProducts(page, nameProduct);
    
    if(products.length <= 0){return 'Produto não encontrado!'}

    return products
  }
}