import { Box, Button, Container, Input, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const router = useRouter();
  const handleClick = () => {
    router.push('/home')
  };
  return (
    <Box display="flex" width="100%" height="100vh" justifyContent="center"
      alignItems="center"
      sx={{ margin: 0 }}>
      <Box sx={{
          border: '1px solid black',
          width: "95%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: "5%",
          borderTopRightRadius: "1%",
          borderBottomRightRadius: "5%",
          borderBottomLeftRadius: "1%"
        }}
        justifyContent="center"
        alignItems="center"
        >
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          value={ email }
          onChange={({ target }) => {
          console.log(email);
          setEmail(target.value)
        }} sx={{ margin: "1%", borderRadius: "2%" }}
        />
        <TextField id="filled-basic" label="Senha" variant="filled" value={ senha }  onChange={({ target }) => {
          console.log(senha);
          setSenha(target.value)
        }} sx={{ margin: "1%", borderRadius: "2%" }}/>
        <Button
          onClick={() => handleClick()}
        >
          Acessar
        </Button>
        <Box>
          <Typography variant='body1' component="span" sx={{ fontSize: "10px", color: "red" }}>não tem conta?</Typography>
          <Button
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
