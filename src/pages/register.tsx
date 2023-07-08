import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import requestApi from '../api/axios';
import { UserInfosProvider } from '../context/UserProvider';
import '../style/registerPage.css';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const router = useRouter();
  const { decodeUser } = UserInfosProvider();

  const handleClick = async () => {
    const regex = /\S+@\S+\.\S+/;
    setValidEmail(regex.test(email));
    if (name.length > 2 && password.length > 4 && regex.test(email)) {
      const { data } = await requestApi.post('/register', { name, password, email })
      
      decodeUser(data.token);
      router.push('/home');
    }
  };

  const handleChange = (setState:Function, value:string) => {
    setState(value);
    if (name.length > 2 && password.length > 4 && email.length > 10) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Box
      height= "100vh"
      sx={{
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "rgba(0, 3, 6, 0.7)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          height: "45vh",
          justifyContent: "center",
          margin: ", 0, 0, 0",
          width: "95vw",
        }}
      >
        <TextField
            id="filled-basic"
            label="Apelido"
            variant="filled"
            value={ name }
            required
            onChange={ ({ target }) => {
              target.value = target.value.replace(/\d+/g, "");
              setName(target.value);
            }}
            sx={{
            margin: "2% 4%",
            borderRadius: "2%",
            width: "80%",
            backgroundColor: "rgba(255, 255, 255, 0.7)"
          }}
          />
        <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            value={ email }
            required
            onChange={ ({ target }) => handleChange(setEmail, target.value) }
            sx={{
              margin: "2% 4%",
              borderRadius: "2%",
              width: "80%",
              backgroundColor: "rgba(255, 255, 255, 0.7)"
            }}
          />
          { !validEmail && <Typography variant='body1' component="span" sx={{ fontSize: "16px", color: "red", fontFamily: 'Kalam, cursive' }}>Email Inválido</Typography> }
          <TextField
            id="filled-basic"
            label="Senha"
            variant="filled"
            value={ password }
            onChange={ ({ target }) => handleChange(setPassword, target.value) }
            required
            sx={{
              margin: "2% 4%",
              borderRadius: "2%",
              width: "80%",
              backgroundColor: "rgba(255, 255, 255, 0.7)"
            }}
          />
      </Box>
      <Button
        disabled={ disabled }
        sx={{
          fontFamily: 'Kalam, cursive',
          }}
        variant="contained"
        onClick={() => handleClick()}
      >
        Cadastrar
      </Button>
    </Box>
  )
}