import { Alert, AlertTitle, Box, Button, Collapse, Grid, MenuItem, Select, SelectChangeEvent, Slide, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import '../style/loginPage.css';
import { Add, ArrowDropDown, ArrowDropUp, Backspace, Edit, FormatListBulleted, RestartAlt } from '@mui/icons-material';
import { IProduct } from '../interfaces/products';
import RenderProduct from './ProductsList';
import SaveListModal from './Modals/SaveListModal';
import Loading from './Loading';

const NewList = () => {
  const [unity, setUnity] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [openCreator, setOpenCreator] = useState<boolean>(false);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [incompleteData, setIncompleteData] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');
  const [definedListName, setDefinedListName] = useState<string>('');
  const [editListName, setEditListName] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>({ sequence: 0, measure: '', productName: '', quantity: '' });
  const [savingList, setSavingList] = useState<boolean>(false);
  const [response, setResponse] = useState<number>(0);

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
    setUnity('');
    setProductName('');
    setQuantity('');
    setDefinedListName(listName);
    setEditListName(true);
  }

  const buildProduct = () => {
    if (productList.length && !unity && !productName && !quantity) {
      setDefinedListName(listName);
      setEditListName(true);
      return
    }
    if ((!productList.length && !listName) || (!unity || !productName || !quantity)) {
      setIncompleteData(true);
      setTimeout(() => { setIncompleteData(false) }, 3500);
      return
    }
    addProducOnList({ sequence: productList.length ? productList.length : 0, measure: unity, productName, quantity })
  };

  const handleSaveList = () => {
    setConfirmModal(true);
  }

  useEffect(() => {
    if (!openCreator) {
      setUnity('');
      setProductName('');
      setQuantity('');
    }
  }, [openCreator]);

  useEffect(() => {
    if (response === 200) {
      setOpenCreator(false);
      setProductList([]);
      setDefinedListName('');
      setListName('');
      setEditListName(false);
      setTimeout(() => { setResponse(0) }, 3000)
    }
  }, [response])


  if (savingList) {
    return <Loading color='info' size='25px' />
  } else {
    return (
      <Box
        sx={{ overflowY: 'auto', maxHeight: '90vh' }}
      >
        <Slide
          direction='down'
          in={response === 200}
          timeout={800}
          hidden={response !== 200}
          style={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999,
          }}
        >
          <Alert severity='success'>
            <AlertTitle sx={{ margin: '1px 0 0 0' }}>Lista salva com sucesso!</AlertTitle>
          </Alert>
        </Slide>
        <SaveListModal
          open={confirmModal}
          setOpen={setConfirmModal}
          listName={listName}
          productsList={productList}
          isSaving={setSavingList}
          setResponse={setResponse}
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
                alignItems: 'center',
                justifyContent: 'space-evenly',
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
                <Typography variant='button'>Produto</Typography>
                <TextField
                  size='small'
                  sx={{ backgroundColor: 'white', borderRadius: 1.5, width: 180 }}
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
                <Typography variant='button'>Qtd</Typography>
                <TextField
                  size='small'
                  type='number'
                  sx={{ backgroundColor: 'white', borderRadius: 1.5, width: 70 }}
                  value={quantity}
                  onChange={handleQuantity}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant='button'>Unidade</Typography>
                <Select
                  sx={{
                    backgroundColor: 'white',
                    width: 70
                  }}
                  value={unity}
                  size='small'
                  onChange={(e: SelectChangeEvent) => handleChange(e, setUnity)}
                >
                  <MenuItem value='Kg'>Kg</MenuItem>
                  <MenuItem value='g'>g</MenuItem>
                  <MenuItem value='Lt'>Lt</MenuItem>
                  <MenuItem value='ml'>ml</MenuItem>
                  <MenuItem value='Un'>Un</MenuItem>
                </Select>
              </Box>
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
            </Box>
            <Box
              sx={{ width: '90vw' }}
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
              <Backspace
                onClick={() => {
                  setProductName('');
                  setQuantity('');
                  setUnity('');
                }}
                sx={{
                  color: 'white',
                  fontSize: '30px',
                  margin: incompleteData ? '0 0 0 40px' : '0 0 0 5px'
                }}
              />
              <Add
                onClick={buildProduct}
                sx={{
                  backgroundColor: 'rgb(0, 13, 255)',
                  color: 'black',
                  borderRadius: 2,
                  fontSize: '28px',
                  margin: '0 0 0 20px'
                }}
              />
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

}

export default NewList;
