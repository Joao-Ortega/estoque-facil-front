import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import requestApi from '../api/axios';
import RenderProduct from './ProductsList';
import Loading from './Loading';
import { updateUserList } from '../api/user';


const MainPage: React.FC = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const router = useRouter();

  const requestListProducts = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userData') as string);
      const response = await requestApi.get('/products', { headers: {
        authorization: token,
      } });

      const list = response.data.message[0].lists
      localStorage.setItem('listName', list[list.length - 1].listName);
      localStorage.setItem('listProducts', JSON.stringify(list[list.length - 1].productsList));
      setListProducts(list[list.length - 1].productsList);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error)
      alert("Usuário não autenticado");
      router.push('/');
    }
  };

  const saveList = () => {
    localStorage.setItem('listProducts', JSON.stringify(listProducts));
    const listName = localStorage.getItem('listName') as string;
    setDisabled(true);
    // validar se realmente foi salvo no banco de dados
    updateUserList({ listName, productsList: listProducts })
  }

  useEffect(() => {
    setIsLoading(true);
    requestListProducts();
  }, []);

  if (isLoading) {
    return (<Loading size='65px' color='green' />)
  } else {
    return (
      <Box sx={{
        overflowY: 'auto',
        paddingTop: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        {listProducts.length ? listProducts.map((product: any, i: number) => {
          return <RenderProduct key={i} product={product} disabled={disabled} />
          }) : <Typography>Lista Vazia</Typography>}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            position: 'fixed',
            bottom: 5,
          }}
        >
          <Button
            variant={disabled ? 'contained' : 'outlined'}
            sx={{
              margin: '0 auto 0 auto',
              width: '45%',
              height: '7vh',
              color: '#fff',
            }}
            onClick={() => { setDisabled(false); console.log('Botão editar clicado'); }}
            disabled={!disabled}
          >Editar</Button>
          <Button
            variant={disabled ? 'outlined' : 'contained'}
            sx={{
              margin: '0 auto 0 auto',
              width: '45%',
              height: '7vh',
              color: '#fff',
          }}
            onClick={saveList}
            disabled={disabled}
          >Salvar</Button>
        </Box>
      </Box>
    )
  }

}

export default MainPage;
