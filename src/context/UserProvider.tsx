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
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const decodeUser = (token: string): void => {
    const decodetoken = jwt.verify(token, `${process.env.SECRET}`)
    const objectGlobal = {
      ...decodetoken,
      token,
    }
    localStorage.setItem('userData', JSON.stringify({ name: objectGlobal.name, token: objectGlobal.token }));
    setUser(objectGlobal);
  };
  console.log('user', user);
  
  const values = useMemo(() => ({
    user,
    setUser,
    decodeUser,
  }), [user, setUser]);

  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  );
};

export const UserInfosProvider = () => useContext(UserContext);
