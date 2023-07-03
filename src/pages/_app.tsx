import React from 'react'
import { UserProvider } from '../context/UserProvider';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../app/globals.css';

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
