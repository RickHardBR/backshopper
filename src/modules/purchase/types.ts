export type DataListType = {
  id_product: number
  qty_product_selected: number
}

export type RequestType = {
  delivey_date: string
  listPurchases: DataListType[]
}
