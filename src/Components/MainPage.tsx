import React from 'react'
import { UserInfosProvider } from '../context/UserProvider'

export default function MainPage() {
  const { user } = UserInfosProvider();
  return (
    <div>{ user }</div>
  )
}
