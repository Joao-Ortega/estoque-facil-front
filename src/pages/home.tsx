
import { Box } from '@mui/material';
import MainPage from '../Components/MainPage';
import Header from '../Components/Header';
import { UserInfosProvider } from '../context/UserProvider';

export default function Home() {
  const { user } = UserInfosProvider();
  return (
    <Box sx={ { overflowY: 'auto', height: '100vh' } } >
      <Header title={ user && user.name } page="home" />
      <MainPage />
    </Box>
  )
};
