import { IFields } from "../interfaces";
import requestApi from "./axios";

export const updateUser = async (params: IFields): Promise<any> => {
  if (!Object.keys(params).length) return { status: 200 }
  try {
    const { token } = JSON.parse(localStorage.getItem('userData') as string);
    const { data } = await requestApi.put(
      '/user',
      { ...params },
      { headers: { authorization: token } }
    );
    return data
  } catch (error) {
    console.log('error', error)
  }
}