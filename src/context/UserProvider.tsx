import React, { ReactNode, createContext, useState, useMemo, useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IDecodedToken, IUser, IUserContextData } from '../interfaces/userInterfaces';
dotenv.config();
interface IUserProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContextData>({} as IUserContextData);

export const UserProvider = ({ children }: IUserProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const decodeUser = (token: string): void => {
    const decodedToken = jwt.verify(token, `${process.env.SECRET}`) as IDecodedToken
    const objectGlobal = { name: decodedToken.name, token }
    localStorage.setItem('userData', JSON.stringify(objectGlobal));
    setUser(objectGlobal);
  };
  
  const values = useMemo(() => ({
    user,
    setUser,
    decodeUser,
  }), [user, setUser]) as IUserContextData;

  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  );
};

export const UserInfosProvider = () => useContext(UserContext);
