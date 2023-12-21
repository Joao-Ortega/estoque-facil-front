import { IFields, IValidateObj } from "../interfaces"

export const checkInputField = (field: IFields): IValidateObj => {
  if (field.email && !validateEmail(field.email)) return { error: true, message: 'Email em formato inválido' }
  if (field.name && !validateName(field.name)) return { error: true, message: 'Nome inválido' }
  if ((field.password || field.password === '') && !validatePass(field.password)) return { error: true, message: 'Senha em formato inválido' }
  return { error: false, message: '' }
}

const validateEmail = (email: string): boolean => {
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return regex.test(email);
}
const validateName = (name: string): boolean => {
  if (name.length < 3) return false
  return true
}
const validatePass = (pass: string): boolean => {
  const regex = /^(?=.*\d).{7,}$/;
  return regex.test(pass);
}