import { 
  UsersModelDataType,
  ProductTypeModel,
  PurchaseModelDataType,
  ListPurchasesType,
 } from './types';

export interface IPurchaseModel{
  purchase: (email: string, data: PurchaseModelDataType) => Promise<void>;
  findUser: (email: string) => Promise<UsersModelDataType>;
  soldOutProducts:(purchaseProducts: ListPurchasesType[]) => 
  Promise<ProductTypeModel[]>;
}