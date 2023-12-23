import { Alert, Box, Button, Collapse, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import '../style/loginPage.css';
import { Add, ArrowDropDown, ArrowDropUp, Edit, FormatListBulleted, RestartAlt } from '@mui/icons-material';
import { IProduct } from '../interfaces/products';
import RenderProduct from './ProductsList';
import SaveListModal from './Modals/SaveListModal';

const NewList = () => {
  const [category, setCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [openCreator, setOpenCreator] = useState<boolean>(false);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [incompleteData, setIncompleteData] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');
  const [definedListName, setDefinedListName] = useState<string>('');
  const [editListName, setEditListName] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>({ image: '', productName: '', quantity: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent, callback: Function) => {
    callback(event.target.value);
  }

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const LIMIT = 1000
    if (Number(event.target.value) > LIMIT) {
      setQuantity('1000')
    } else {
      setQuantity(event.target.value)
    }
  }

  const addProducOnList = (product: IProduct) => {
    setProductList([...productList, product])
    setCategory('');
    setProductName('');
    setQuantity('');
    setDefinedListName(listName);
    setEditListName(true);
  }

  const buildProduct = () => {
    if (productList.length && !category && !productName && !quantity) {
      setDefinedListName(listName);
      setEditListName(true);
      return
    }
    if ((!productList.length && !listName) || (!category || !productName || !quantity)) {
      setIncompleteData(true);
      setTimeout(() => { setIncompleteData(false) }, 3500);
      return
    }
    addProducOnList({ image: '', productName, quantity })
  };

  const handleSaveList = () => {
    setConfirmModal(true);
  }

  useEffect(() => {
    if (!openCreator) {
      setCategory('');
      setProductName('');
      setQuantity('');
    }
  }, [openCreator]);

  return (
    <Box
      sx={{ overflowY: 'auto', maxHeight: '90vh' }}
    >
      <SaveListModal
        open={confirmModal}
        setOpen={setConfirmModal}
        listName={listName}
        productsList={productList}
      />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          padding: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '8px 8px 2px 2px',
        }}
        onClick={() => setOpenCreator(!openCreator)}
      >
        <Typography marginRight={2} variant='h5'>Nova Lista</Typography>
        <FormatListBulleted />
        {openCreator ? (<ArrowDropUp fontSize='large' />) : (<ArrowDropDown fontSize='large' />)}
      </Box>
      <Collapse in={openCreator} timeout={600} >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0 0 5px 0'
            }}
          >
            <Typography variant='button'>Nome da Lista</Typography>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <TextField
                size='small'
                disabled={!!definedListName && editListName}
                inputProps={{ maxLength: 25 }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                  minWidth: 250,
                  margin: editListName ? '0 10px 0 40px' : 0
                }}
                value={listName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setListName)}
              />
              {editListName && <Edit onClick={() => setEditListName(false)} color='warning' />}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0 0 10px 0'
            }}
          >
            <Typography variant='button'>Categoria</Typography>
            <Select
              sx={{
                backgroundColor: 'white',
                minWidth: 250
              }}
              value={category}
              size='small'
              onChange={(e: SelectChangeEvent) => handleChange(e, setCategory)}
            >
              <MenuItem value='0'>Açougue</MenuItem>
              <MenuItem value='1'>Limpeza/Higiene</MenuItem>
              <MenuItem value='2'>Padaria</MenuItem>
              <MenuItem value='3'>Bebidas</MenuItem>
              <MenuItem value='4'>Utensílios</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              margin: '0 0 10px 0',
              width: '100vw'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='button'>Nome do Produto</Typography>
              <TextField
                size='small'
                sx={{ backgroundColor: 'white', borderRadius: 1.5, minWidth: 250 }}
                value={productName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setProductName)}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='button'>Quantidade</Typography>
              <TextField
                size='small'
                type='number'
                sx={{ backgroundColor: 'white', borderRadius: 1.5, maxWidth: 80 }}
                value={quantity}
                onChange={handleQuantity}
              />
            </Box>
          </Box>
          <Box
            sx={{ width: '80vw' }}
            display='flex'
            justifyContent={incompleteData ? 'space-between' : 'flex-end'}
            alignItems='center'
            padding={0.5}
          >
            {incompleteData &&
              (
                <Alert
                  sx={{
                    alignSelf: 'start',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    height: '25px'
                  }}
                  severity='error'
                >
                  Preencha todos os campos!
                </Alert>
              )
            }
            <Box>
              <RestartAlt
                onClick={() => {
                  setProductName('');
                  setQuantity('');
                  setCategory('');
                }}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: 5,
                  fontSize: '25px',
                  margin: '0 0 0 5px'
                }}
              />
              <Add
                onClick={buildProduct}
                sx={{
                  backgroundColor: 'green',
                  color: 'black',
                  borderRadius: 5,
                  fontSize: '25px',
                  margin: '0 0 0 20px'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
      {definedListName && (
        <Grid
          display='flex'
          alignItems='center'
          container
          justifyContent='center'
          sx={{ margin: '5px 0 0 0' }}
        >
          <Grid
            display='flex'
            alignItems='center'
            justifyContent='center'
            item
            xs={9}
          >
            <Typography
              sx={{
                margin: '10px 0 5px 0',
                fontSize: 20,
                fontWeight: 600,
                textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                color: 'white',
              }}
              textAlign='center'
              variant='body2'
            >
              {definedListName}
            </Typography>
          </Grid>
          <Grid
            display='flex'
            alignItems='center'
            justifyContent='center'
            item
            xs={3}
          >
            <Button
              color='success'
              variant='contained'
              size='small'
              onClick={handleSaveList}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      )}
      <Box>
        {productList.length ? productList.map((product: IProduct, i: number) => (
          <RenderProduct key={i} product={product} />
        )) : null}
      </Box>
    </Box>
  )
}

export default NewList;
