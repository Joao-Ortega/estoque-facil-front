import React, { useEffect } from 'react'
import { UserInfosProvider } from '../context/UserProvider'

export default function MainPage() {
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
