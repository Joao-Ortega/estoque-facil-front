import React, { useEffect } from 'react'
import { UserInfosProvider, UserProvider } from '../context/UserProvider';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../app/globals.css';
import Header from '../Components/Header';
import { Box } from '@mui/material';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Estoque Fácil</title>
      </Head>
      <UserProvider>
        <Component {...pageProps}/>
      </UserProvider>
    </>
  )
}

export default App;
