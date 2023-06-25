import React, { ReactNode, createContext, useState, useMemo, useContext } from 'react';

interface IUserProps {
  children: ReactNode;
}


interface IUserContextData {
  user: any;
  setUser: Function;
}

export const UserContext = createContext<IUserContextData>({} as IUserContextData);

const UserProvider = ({ children }: IUserProps) => {
  const [user, setUser] = useState<any | null>(null);
  const userContext = useContext(UserContext);
  // const values = useMemo(() => ({
  //   user,
  //   setUser,
  // }), [user, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserInfosProvider = () => UserProvider(UserContext);

export default UserProvider;