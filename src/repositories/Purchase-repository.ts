import { BaseDatabase } from '../data/Database';

import { generateId } from '../utils/generateId';

import {
  IPurchaseModelData,
  IPurchaseModel,
  ListPurchasesType,
  ProductsAndPurchaseType
} from '../models/PurchaseModel';
import { IProductTypeModel } from '../models/ProductTypeModel';

export class PurchaseRepository extends BaseDatabase implements IPurchaseModel {
  private TABLES = {
    product: 'Shopper_Product',
    purchase: 'Shopper_Purchase',
    user: 'Shopper_User'
  }
//metodo que procura o usuário  no BD.
  async findUser (email: string){
    const [user] = await BaseDatabase.getConnection()
    .from(this.TABLES.user)
    .where('email', email)

    return user
  }

/*soldOutProducts = verifica se todos os produtos da compra tem quantidade menor que o estoque,
se tiver retorna um array vazio,.
se a quantidade selecionada for maior que o estoque retorna um array de produtos encontrados.*/

   async soldOutProducts (purchaseProducts: ListPurchasesType[]){
    const products: IProductTypeModel[] = []
    let soldOutProducts: IProductTypeModel[] =[]

    for (let i = 0; i < purchaseProducts.length; i++){
      const [product] = await BaseDatabase.getConnection(this.TABLES.product)
      .where('id_product', purchaseProducts[i].id_product)
      products.push(product)
    
      if(purchaseProducts[i].qty_product_selected > products[i].qty_stock){
        soldOutProducts.push(products[i])
      }
    }

    return soldOutProducts
  }

  /*purchase = recebe email para vincular a compra ao usuario e
  o paramentro data recebe a data de entrega e a lista de compras.
  */
  async purchase(email: string, data: IPurchaseModelData) {
    //const user =  chama o metodo findUser que procura as informações do usuario no banco de dados e retorna.
    const user = await this.findUser(email);
    let products: IProductTypeModel[] | any = []
    let productsAndPurchase: ProductsAndPurchaseType[] = []

    /* Percorrer a lista de compras e compara os IDs da lista de compras com os ids dos produtos
    do Banco de Dados e mergeia (junta) as propriedades do objeto produto com as do objeto que vem
    da lista de compras e no jogam para uma nova lista = productsAndPurchase.
    */
    for (let i = 0; i < data.listPurchases.length; i++){
      const [product] = await BaseDatabase.getConnection(this.TABLES.product)
      .where('id_product', data.listPurchases[i].id_product)
      products.push(products)
      const mergeObj = {...product, ...data.listPurchases[i]}
      productsAndPurchase.push(mergeObj)
    }
/*
*/
    productsAndPurchase.forEach( async (item) => {
      
      //* Inserir compra do produto no banco de dados dinâmicamente na tabela purchase.
      await BaseDatabase.getConnection(this.TABLES.purchase)
        .insert({
          id_purchase: generateId(),
          product_name: item.product_name,
          price: item.price,
          qty_product_selected: item.qty_product_selected,
          total_price: (item.price * item.qty_product_selected),
          buy_date: new Date(),
          delivey_date: new Date(data.delivey_date + "T00:00"),
          id_purchase_ref: user.id_user,
        })
    })

      //* Atualizar quantidade do stock do produto.
      productsAndPurchase.forEach(async (item) => {
        await BaseDatabase.getConnection(this.TABLES.product)
        .update('qty_stock', item.qty_stock - item.qty_product_selected)
        .where('id_product', item.id_product)
      })
  }
}