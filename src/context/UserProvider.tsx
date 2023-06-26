import React, { ReactNode, createContext, useState, useMemo, useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
interface IUserProps {
  children: ReactNode;
}


interface IUserContextData {
  user: any;
  decodeUser: Function;
}

export const UserContext = createContext<IUserContextData>({} as IUserContextData);

export const UserProvider = ({ children }: IUserProps) => {
  const [user, setUser] = useState<any | null>(null);
  const decodeUser = (token: string): void => {
    const decodetoken = jwt.verify(token, `${process.env.SECRET}`)
    const objectGlobal = {
      ...decodetoken,
      token,
    }
    setUser(objectGlobal);
  };
  
  const values = useMemo(() => ({
    user,
    setUser,
    decodeUser,
  }), [user, setUser]);

  console.log('Provider', user);
  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  );
};

export const UserInfosProvider = () => useContext(UserContext);
