import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import requestApi from '../api/axios';
import { UserInfosProvider } from '../context/UserProvider';
import '../style/loginPage.css';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { decodeUser } = UserInfosProvider();

  const handleClick = async () => {
    const response = await requestApi.post('/login', { email, password })
    try {
      decodeUser(response.data.token);
      router.push('/home');
    } catch (error) {
      console.log('catch => error', error)
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: 0 }}>
        <Typography
          variant='h4'
          margin="-20% 0 10% 0"
          className="title"
          sx={{
            fontFamily: 'Kalam, cursive', 
            fontWeight: '1000',
            textShadow: '1px 1px 1px white',
          }}
        >
          Estoque Fácil
        </Typography>
      <Box
        sx={{
          backgroundColor: "rgba(0, 3, 6, 0.7)",
          width: "95vw",
          height: "45vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px"
        }}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          label="Email"
          variant="filled"
          value={ email }
          required
          onChange={({ target }) => { setEmail(target.value) }}
          sx={{ margin: "1%", borderRadius: "2%", backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="filled"
          value={ password }
          onChange={({ target }) =>  setPassword(target.value) }
          required
          sx={{ margin: "1%", borderRadius: "2%", backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        />
        <Button
          onClick={handleClick}
          sx={{ margin: "1%", color: "white", fontFamily: 'Kalam, cursive', }}
        >
          Entrar
        </Button>
        <Box>
          <Typography
            variant='body1'
            component="span"
            sx={{ color: "white", fontFamily: 'Kalam, cursive' }}
          >
            Não possui conta?
          </Typography>
          <Button
            onClick={() => router.push('/register')}
            color="error"
            // size="small"
            sx={{ color: "red", fontFamily: 'Kalam, cursive' }}
          >
            Cadastre-se
          </Button>
        </Box>
      </Box>
    </Box>
  )
}