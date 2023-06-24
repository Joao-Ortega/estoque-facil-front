import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import requestApi from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const router = useRouter();
  const handleClick = async () => {
    try {
      const data = await requestApi.post('/login', { email, password })
      console.log(data);
    } catch (error) {
      console.log('error', error)
      const { message } = error.response.data
      console.log(message);
      
    }
    
    // const bodyRequest = { email, password };
    // router.push('/home');
  };
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: 0 }}>
      <Box
        sx={{
          border: '1px solid black',
          width: "95%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: "5%",
          borderTopRightRadius: "1%",
          borderBottomRightRadius: "5%",
          borderBottomLeftRadius: "1%",
        }}
        justifyContent="center"
        alignItems="center"
        >
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          value={ email }
          required
          onChange={({ target }) => { setEmail(target.value) }}
          sx={{ margin: "1%", borderRadius: "2%" }}
        />
        <TextField
          id="filled-basic"
          label="Senha"
          variant="filled"
          value={ password }
          onChange={({ target }) =>  setPassword(target.value) }
        required
        sx={{ margin: "1%", borderRadius: "2%" }}/>
        <Button
          onClick={handleClick}
        >
          Acessar
        </Button>
        <Box>
          <Typography
            variant='body1'
            component="span"
            sx={{ fontSize: "10px", color: "red" }}
          >
            não possuí conta?
          </Typography>
          <Button
            // onClick={() => router.push('/register')}
          >
            Cadastre-se
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
