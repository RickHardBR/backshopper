export interface UsersModelDataType {
  first_name:string;
  last_name:string;
  email:string;
}

//* ====================================

export interface ProductTypeModel {
  id_product:number;
  product_name: string;
  price:number;
  qty_stock: number;
  photo_product:string;
}

//* =======================================
// export interface PurchaseTypeModel {
//     id_purchase: string;
//     product_name: string;
//     price: number;
//     qty_product:number;
//     total_price: number;
//     buy_date: Date;
//     delivey_date: Date;
//     photo_product:string;
//   }

//* Saida
  export type PurchasedProductType = {
    id_product: number,
    product_name: string,
    price: number,
    qty_stock: number,
    qty_product_selected: number,
  }

  //* Entrada
  export type ListPurchasesType = {
    id_product: number ,
    qty_product_selected: number,
  }
  
  //* Entrada Parametro função
  export interface PurchaseModelDataType {
    delivey_date: string;
    listPurchases: ListPurchasesType[];
  }