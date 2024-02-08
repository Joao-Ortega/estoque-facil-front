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

// usar essa função para finalizar uma lista
// obs: não está sendo usando no projeto
export const updateUserList = async (list: IListInfo) => {
  // console.log(list)
  // console.log(`${'/products'}/${list.listName}`)
  try {
    const { token } = JSON.parse(localStorage.getItem('userData') as string);
    const response = await requestApi.put(
      '/products',
      list,
      { headers: { authorization: token } }
    );
    return { code: response.status }
  } catch (error: any) {
    console.log(error.response.data.message)
    return { code: error.response.status, message: error.response.data.message }
  }
}