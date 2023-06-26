import React, { useEffect } from 'react'
import { UserInfosProvider } from '../context/UserProvider'

export default function MainPage() {
  const { user } = UserInfosProvider();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.token}</div>
      <div>{user.id}</div>
      <div>{user.memberSince}</div>
    </div>
  )
}
