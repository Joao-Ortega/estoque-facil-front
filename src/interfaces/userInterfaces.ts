import jwt from 'jsonwebtoken';

export interface IUserContextData {
  user: IUser;
  setUser: Function;
  decodeUser: Function;
  getPersonalInfos: Function;
}

export interface IUser {
  name: string;
  token: string;
}


export interface IDecodedToken extends jwt.JwtPayload {
  name: string;
  token: string;
  email: string;
  memberSince: string;
  updatedAt: Date;
}

