export interface UsersModelDataType {
  first_name: string
  last_name: string
  email: string
}

export interface ProductTypeModel {
  id_product: number
  product_name: string
  price: number
  qty_stock: number
  photo_product: string
}

export type PurchasedProductType = {
  id_product: number
  product_name: string
  price: number
  qty_stock: number
  qty_product_selected: number
}

export type ListPurchasesType = {
  id_product: number
  qty_product_selected: number
}

export interface PurchaseModelDataType {
  delivey_date: string
  listPurchases: ListPurchasesType[]
}
