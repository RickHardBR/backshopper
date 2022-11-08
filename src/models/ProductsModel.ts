import { ProductTypeModel } from './types';

export interface IProductsModel {
  getAllProducts:(numberCurrentPage: number)=> Promise<ProductTypeModel[]>; 
}