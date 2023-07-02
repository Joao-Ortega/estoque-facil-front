import React from 'react'
import { UserProvider } from '../context/UserProvider';

const App: React.FC = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps}/>
    </UserProvider>
  )
}

export default App;
