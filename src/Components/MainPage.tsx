import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import requestApi from '../api/axios';
import RenderProduct from './ProductsList';
import Loading from './Loading';
import { updateUserList } from '../api/user';
import FinishListModal from './Modals/FinishListModal';


const MainPage: React.FC = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productsNotPurchased, setproductsNotPurchased] = useState([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();

  const requestListProducts = async () => {
    try {
      const listProductsLocalStorage = localStorage.getItem('listProducts');
      if (listProductsLocalStorage) {
        setListProducts(JSON.parse(listProductsLocalStorage));
        setIsLoading(false);
      } else {
        const { token } = JSON.parse(localStorage.getItem('userData') as string);
        const response = await requestApi.get('/products', { headers: {
          authorization: token,
        } });

        const list = response.data.message[0].lists;
        localStorage.setItem('listName', list[list.length - 1].listName);
        localStorage.setItem('listProducts', JSON.stringify(list[list.length - 1].productsList));
        const listHistory = list.splice(0, list.length - 1);
        // juntando os dois arrays (history e última lista)
        // console.log([...listHistory, ...list]);
        localStorage.setItem('listHistoryProducts', JSON.stringify(listHistory));
        setListProducts(list[list.length - 1].productsList);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error', error)
      alert("Usuário não autenticado");
      router.push('/');
    }
  };

  const saveList = () => {
    setIsLoading(true);
    localStorage.setItem('listProducts', JSON.stringify(listProducts));
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
    // const listName = localStorage.getItem('listName') as string;
    // validar se realmente foi salvo no banco de dados
    // updateUserList({ listName, productsList: listProducts })
  }

  const handleFinish = () => {
    const filterByChecked = listProducts.filter((product: any) => !product.checked);
    setproductsNotPurchased(filterByChecked);
    setOpenModal(true);
  }

  const finishCanceled = () => {
    setOpenModal(false);
    setproductsNotPurchased([]);
  }

  const finishConfirmed = (totalValue: string) => {
    const infosList = {
      listName: localStorage.getItem('listName') as string,
      totalValue,
      productsList: listProducts,
    }
    const list = localStorage.getItem('listHistoryProducts');
    const newListHistory = [...JSON.parse(list), infosList, infosList];
    setOpenModal(false);
    localStorage.removeItem('listProducts');
    localStorage.removeItem('listName');
    localStorage.setItem('listHistoryProducts', JSON.stringify(newListHistory));
    setListProducts([]);
    // criação de lógica para salvar a lista no banco de dados
    // atualizar a página ou chamar a função requestListProducts
    // 1° opção: setIsLoading(true); requestListProducts();
    // 2° opção: window.location.reload();
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
        height: '78vh',
      }}>
        {listProducts.length ? listProducts.map((product: any, i: number) => {
          return <RenderProduct key={i} product={product} />
          }) : <Typography sx={{ alignSelf: 'center', display: 'flex', color: '#fff' }}>Crie uma nova lista</Typography>}
          {openModal ? (
            <FinishListModal
              list={productsNotPurchased}
              listName={localStorage.getItem('listName') as string}
              confirmed={finishConfirmed}
              canceled={finishCanceled}
            />
          ) : null}
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
            variant='contained'
            sx={{
              margin: '0 auto 0 auto',
              width: '30%',
              height: '4vh',
              color: '#fff',
            }}
            onClick={saveList}
          >Salvar</Button>
          <Button
            variant='contained'
            sx={{
              margin: '0 auto 0 auto',
              width: '30%',
              height: '4vh',
              color: '#fff',
          }}
            onClick={handleFinish}
          >Finalizar</Button>
        </Box>
      </Box>
    )
  }

}

export default MainPage;
