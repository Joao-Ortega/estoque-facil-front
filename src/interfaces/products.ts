export interface IProduct {
  sequence: number;
  measure: string;
  productName: string;
  quantity: string;
  checked: boolean;
}

export interface IListInfo {
  listName: string;
  productsList: IProduct[];
}