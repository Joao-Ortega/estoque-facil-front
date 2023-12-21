import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'

const Form = () => {
  const [nameProduct, setNameProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('Outros');
  const [qtdProduct, setQtdProduct] = useState('');

  const handleClick = () => {
  };

  return (
    <Box>
      <TextField
        id="filled-basic"
        label="nome do produto"
        variant="filled"
        size="small"
        value={nameProduct}
        onChange={({ target }) => setNameProduct(target.value)}
        required
        sx={{ margin: "1%", borderRadius: "2%" }}
      />
      <TextField
        id="filled-basic"
        label="Quant"
        type="number"
        size="small"
        variant="filled"
        value={qtdProduct}
        onChange={({ target }) => setQtdProduct(target.value)}
        required
        sx={{ margin: "1%", borderRadius: "2%", width: '30%' }}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        size="small"
        value={ categoryProduct }
        label="category"
        onChange={({ target }) => setCategoryProduct(target.value) }
        sx={{ width: '30%', marginTop: '7px' }}
      >
        <MenuItem defaultChecked value="acougue">Açougue</MenuItem>
        <MenuItem value="frios">Frios</MenuItem>
        <MenuItem value="padaria">Padaria</MenuItem>
      </Select>
      <Button
        onClick={ handleClick }
      >
        Adicionar
      </Button>
    </Box>
  )
}

export default Form;
