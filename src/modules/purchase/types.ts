export type DataListType = {
  id_product: number,
  qty_product_selected: number,
}

export interface RequestType {
  delivey_date: string;
  listPurchases: DataListType[];
}