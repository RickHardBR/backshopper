import { IUsersModelData } from './UsersModel';

import { IProductTypeModel } from './ProductTypeModel';

export interface IPurchaseModelData {
  id_product: number;
  qty_product_selected: number;
  delivey_date: string;
}

export interface IPurchaseModel{
  purchase: (email: string, data: IPurchaseModelData) => Promise<void | boolean>;
  findUser: (email: string) => Promise<IUsersModelData>;
  findProduct:(idProduct:number)=> Promise<IProductTypeModel>
}