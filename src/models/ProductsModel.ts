import { IProductTypeModel } from './ProductTypeModel';

export interface IProductsModel {
  getAllProducts:(page: number, nameProduct?: string, id?: number, selectQty?:number)=> Promise<IProductTypeModel[]>;
  
}