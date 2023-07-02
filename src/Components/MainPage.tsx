import React, { useEffect } from 'react'
import { UserInfosProvider } from '../context/UserProvider'

const MainPage: React.FC = () => {
  const { user } = UserInfosProvider();

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  return (
    <div>
      <div>{user && user.name}</div>
      <div>{user && user.token}</div>
    </div>
  )
}

export default MainPage;
