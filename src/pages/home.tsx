
import { UserProvider } from '../context/UserProvider';
import MainPage from '../Components/MainPage';

export default function Home() {
  return (
    <UserProvider>
      <MainPage />
    </UserProvider>
  )
};
