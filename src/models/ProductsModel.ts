import { IProductTypeModel } from './ProductTypeModel';

export interface IProductsModel {
  getAllProducts:(page: number, nameProduct?: string)=> Promise<IProductTypeModel[]>;
  
}