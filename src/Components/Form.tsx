import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'

const Form = () => {
  const [nameProduct, setNameProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('Outros');
  const [qtdProduct, setQtdProduct] = useState('');

  const handleClick = () => {
    console.log('name', nameProduct);
    console.log('categoryProduct', categoryProduct);
    console.log('qtdProduct', qtdProduct);
  };

  return (
    <Box>
      <TextField
        id="filled-basic"
        label="Senha"
        variant="filled"
        value={nameProduct}
        onChange={({ target }) => setNameProduct(target.value)}
        required
        sx={{ margin: "1%", borderRadius: "2%" }}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={ categoryProduct }
        label="Age"
        onChange={({ target }) => setCategoryProduct(target.value) }
      >
        <MenuItem value="acougue">Açougue</MenuItem>
        <MenuItem value="frios">Frios</MenuItem>
        <MenuItem value="padaria">Padaria</MenuItem>
      </Select>
      <TextField
        id="filled-basic"
        label="Senha"
        type="number"
        variant="filled"
        value={qtdProduct}
        onChange={({ target }) => setQtdProduct(target.value)}
        required
        sx={{ margin: "1%", borderRadius: "2%" }}
      />
      <Button
        onClick={ handleClick }
      >
        Adicionar
      </Button>
    </Box>
  )
}

export default Form;
