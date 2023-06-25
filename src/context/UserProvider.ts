import React, { ReactNode, createContext, useState, useContext } from 'react';

interface IUserProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
}

type IUserContextData = {
  user: User | null;
  setUser: Function;
}

export const UserContext = createContext<IUserContextData | undefined>(
  {} as IUserContextData
);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: IUserProps) => {
  const [user, setUser] = useState<User | null>(null);

  const values = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  );
};