export interface IProduct {
  sequence: number;
  measure: string;
  productName: string;
  quantity: string;
}

export interface IListInfo {
  listName: string;
  productsList: IProduct[];
}