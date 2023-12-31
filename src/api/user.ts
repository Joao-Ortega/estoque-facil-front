import { IFields } from "../interfaces";
import { IListInfo } from "../interfaces/products";
import requestApi from "./axios";

export const updateUser = async (params: IFields): Promise<any> => {
  if (!Object.keys(params).length) return { status: 200 }
  try {
    const { token } = JSON.parse(localStorage.getItem('userData') as string);
    const response = await requestApi.put(
      '/user',
      { ...params },
      { headers: { authorization: token } }
    );
    return { code: response.status, token: response.data.token }
  } catch (error: any) {
    return { code: error.response.status, message: error.response.data.message }
  }
}

export const createNewUserList = async (list: IListInfo) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userData') as string);
    const response = await requestApi.post(
      '/products',
      list,
      { headers: { authorization: token } }
    );
    return { code: response.status }
  } catch (error: any) {
    return { code: error.response.status, message: error.response.data.message }
  }
} 