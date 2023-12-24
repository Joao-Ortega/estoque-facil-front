import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import requestApi from '../api/axios';
import RenderProduct from './ProductsList';
import Loading from './Loading';


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
      localStorage.setItem('listProducts', JSON.stringify(response.data.message[0].productsList));
      const list = response.data.message[0].lists
      setListProducts(list[list.length - 1].productsList);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error)
      alert("Usuário não autenticado")
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
        {listProducts.length ? listProducts.map((product: any, i: number) => (
          <RenderProduct key={i} product={product} />
        )) : <Typography>Lista Vazia</Typography>}
      </Box>
    )
  }

}

export default MainPage;
