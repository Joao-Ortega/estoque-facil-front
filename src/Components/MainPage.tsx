import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import requestApi from '../api/axios';
import RenderProduct from './ProductsList';
import Loading from './Loading';
import { blue } from '@mui/material/colors';


const MainPage: React.FC = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const requestListProducts = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userData') as string);
      const response = await requestApi.get('/products', { headers: {
        authorization: token,
      } });

      const list = response.data.message[0].lists
      localStorage.setItem('listProducts', JSON.stringify(list[list.length - 1].productsList));
      setListProducts(list[list.length - 1].productsList);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error)
      alert("Usuário não autenticado");
      router.push('/');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    requestListProducts();
  }, []);

  if (isLoading) {
    return (<Loading size='65px' color='green' />)
  } else {
    return (
      <Box sx={ { overflowY: 'auto', marginTop: 8 } }>
        {listProducts.length ? listProducts.map((product: any, i: number) => {
          product.checked = false;
          return <RenderProduct key={i} product={product} />
          }) : <Typography>Lista Vazia</Typography>}
        <Button
          sx={ { margin: '0 auto 0 auto', width: '85vw', height: '10vh', backgroundColor: blue[500] } }
          onClick={ () => { console.log(listProducts); }}
        >AQUI</Button>
      </Box>
    )
  }

}

export default MainPage;
