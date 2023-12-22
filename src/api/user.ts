import { IFields } from "../interfaces";
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
    console.log('error', error)
    return { code: error.response.status, message: error.response.data.message }
  }
}