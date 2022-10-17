import { IPurchaseTypeModel } from './PurchaseTypeModel';

export interface ICartOutPutModel {
  userName: string;
  buyDate: string;
  deliveyDate: string;
  listPurchases: IPurchaseTypeModel[] | [];
}

export interface ICartUserModel {
 get:(userEmail: string, dateFilter: string) => Promise<ICartOutPutModel | any[]>;
}
