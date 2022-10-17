import { BaseDatabase } from '../data/Database';

import { formatDate } from '../utils/formatDate';

import {
  ICartOutPutModel, 
  ICartUserModel
} from '../models/CartUserModel';

export class CartuserRepository extends BaseDatabase
implements ICartUserModel {
  private TABLES = {
    user: 'Shopper_User',
    purchase: 'Shopper_Purchase',
  }

  async get(userEmail: string, dateFilter: string){
    const purchases = await BaseDatabase.getConnection(this.TABLES.purchase)
    .select(
      'id_purchase',
      'product_name',
      'price',
      'qty_product',
      'total_price',
      'delivey_date',
      ).innerJoin(`${this.TABLES.user}`,
      'Shopper_Purchase.id_purchase_ref',
      'Shopper_User.id_user'
      ).where('email', userEmail)

      const [user] = await BaseDatabase.getConnection(this.TABLES.user)
      .where('email', userEmail)

      const cartFilter = purchases.filter((purchase)=>{
          
        purchase.delivey_date = formatDate(purchase.delivey_date, 'short')
        
        return purchase.delivey_date === dateFilter
      })

      if (cartFilter.length <= 0 ) {
        return []
      }

      const cart:ICartOutPutModel = {
        userName: `${user.first_name} ${user.last_name}`,
        buyDate: formatDate(new Date(), 'short'),
        deliveyDate: cartFilter[0].delivey_date,
        listPurchases: cartFilter
      }
            
            
      return cart
  }
}
