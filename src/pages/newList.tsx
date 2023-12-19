import React from 'react'
import NewList from '../Components/NewList';
import { Box } from '@mui/material';
import Header from '../Components/Header';
import { UserInfosProvider } from '../context/UserProvider';

const Create = () => {
  const { user } = UserInfosProvider();

  return (
    <Box sx={ { overflowY: 'auto', height: '100vh' } }>
      <Header title={ user ? user.name : 'P F'} page="home" />
      <NewList />
    </Box>
  )
}

export default Create;
