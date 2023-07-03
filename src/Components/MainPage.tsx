import React, { useEffect } from 'react'
import { UserInfosProvider } from '../context/UserProvider'
import Header from './Header';
import { Box } from '@mui/material';
import Form from './Form';

const MainPage: React.FC = () => {
  const { user } = UserInfosProvider();

  useEffect(() => {
    console.log('page-home', user);
  }, []);

  return (
    <Box>
      <Header title={ user && user.name } page="home" />
      <Form />
      <Box>
        Pegar o que vem do back para renderizar.
      </Box>
    </Box>
  )
}

export default MainPage;
