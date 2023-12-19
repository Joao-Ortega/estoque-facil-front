import React from 'react'
import Header from './Header';
import { UserInfosProvider } from '../context/UserProvider';
import '../style/loginPage.css';
import { Box } from '@mui/material';

const Profile = () => {
  const { user } = UserInfosProvider();

  return (
    <Box sx={ { overflowY: 'auto', height: '100vh', marginTop: 7.5 } } >
      <Header title={ user ? user.name : 'P F'} page="home" />
      <div style={{ color: 'white' }}>CONTA DO USUÁRIO</div>
    </Box>
  )
}

export default Profile;
