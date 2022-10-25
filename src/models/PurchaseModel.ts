import { IUsersModelData } from './UsersModel';

import { IProductTypeModel } from './ProductTypeModel';

export type ListPurchasesType = {
  id_product: number ,
  qty_product_selected: number,
}

export type ProductsAndPurchaseType = {
  id_product: number,
  product_name: string,
  price: number,
  qty_stock: number,
  qty_product_selected: number,
}

export interface IPurchaseModelData {
  delivey_date: string;
  listPurchases: ListPurchasesType[];
}

export interface IPurchaseModel{
  purchase: (email: string, data: IPurchaseModelData) => Promise<void>;
  findUser: (email: string) => Promise<IUsersModelData>;
  soldOutProducts:(purchaseProducts: ListPurchasesType[]) => 
  Promise<IProductTypeModel[]>;
}