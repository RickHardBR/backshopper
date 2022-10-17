import { ICartUserModel } from '../../models/CartUserModel';

export class CartUserCase {
  constructor(
    private cartUserModel: ICartUserModel,
  ){}

  async get(userEmail: string, dateFilter: string) {
    const cart: any = 
    await this.cartUserModel.get(userEmail, dateFilter);

    if(cart.length <= 0) {return 'Este carrinho está vazio.'}

    return cart
  }
}
