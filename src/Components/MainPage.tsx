import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import requestApi from '../api/axios';
import RenderProduct from './ProductsList';


const MainPage: React.FC = () => {
  const [listProducts, setListProducts] = useState([]);
  const router = useRouter();
  const requestListProducts = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userData') as string);
      
      const response = await requestApi.get('/products', { headers: {
      authorization: token,
    } });
    
    localStorage.setItem('listProducts', JSON.stringify(response.data.message[0].productsList));
    setListProducts(response.data.message[0].productsList);
  } catch (error) {
      alert("Usuário não autenticado")
      router.push('/');
    }
  };

  useEffect(() => {
    requestListProducts();
  }, []);

  return (
    <Box sx={ { overflowY: 'auto' } }>
      {listProducts.length ? listProducts.map((product: any, i: number) => (
        <RenderProduct key={i} product={product} />
      )) : <Typography>Lista Vazia</Typography>}
      {/* <ul>
        {listProducts.length === 0 && <p>Lista de compras vazia.</p>}
        {listProducts.length > 0 && (
          <List sx={{ width: '70%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: '3%' }}>
          {listProducts.map((value: any) => (
            <ListItem
              key={value.sequence}
              disableGutters
              secondaryAction={
                <Checkbox color="success" />
              }
            >
              <ListItemText primary={ value.productName } />
              <ListItemText primary={ value.quantity } />
            </ListItem>
          ))}
        </List>
        )}
      </ul> */}
    </Box>
  )
}

export default MainPage;
// listProducts.map((product) => {
//   return (<li key={ product.sequence }>
//     <Checkbox
//       color="success"
//     />
//     <p>{ product.productName }</p>
//     <p>{ product.quantity }</p>
//   </li>)
// })