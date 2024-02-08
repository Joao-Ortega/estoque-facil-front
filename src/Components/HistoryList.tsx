import React, { useEffect, useState } from 'react'
import { Box, Collapse, Typography, Tooltip } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Check, Edit } from '@mui/icons-material';

const RenderHistoryProduct = ({list}: any) => {
  const [openListProduct, setOpenListProduct] = useState<boolean>(false);
  // const [infosUpdated, setInfosUpdated] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setInfosUpdated(false);
  //   }, 3000)
  // }, [infosUpdated])

  return (
    <Box sx={{ marginBottom: '5px', }}>
      <Box
        display='flex'
        alignItems='center'
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '8px 8px 2px 2px',
          padding: 1.5,
          cursor: 'pointer',
          margin: '0px 10px',
        }}
        onClick={() => setOpenListProduct(!openListProduct)}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>{
          list.listName.length > 15 ? `${list.listName.slice(0, 15)}...` : list.listName
        }</Typography>
        <Tooltip title='Editar informações pessoais'>
          { !openListProduct ? (<ArrowDropUp fontSize='large' />) : (<ArrowDropDown fontSize='large' />) }
        </Tooltip>
        {/* { infosUpdated && <Typography sx={{ fontSize: 15, marginLeft: 2, marginRight: 1.5 }}>Dados Atualizados!</Typography> }
        { infosUpdated && <Check color='success' /> } */}
        {list.totalValue ? (
          <Typography sx={{ textAlign: 'center' }}>{`R$ ${list.totalValue}`}</Typography>
          ) : (
          <Typography sx={{ textAlign: 'center' }}>Não informado</Typography>
        )}
      </Box>
      <Box
        sx={{
          maxHeight: '140px',
          overflowY: 'auto',
          margin: '0px 10px',
          border: '1px solid #ffffff70',
          borderRadius: '2px 2px 8px 8px',
        }}
      >
        {list.productsList.map((product: any, i: number) => (
          <Collapse
            key={i}
            in={!openListProduct}
            timeout={600}
          >
            <Typography
              sx={{
                color: 'white',
                padding: 1,
                textDecoration: product.checked ? 'line-through' : '',
                textDecorationColor: 'red',
              }}
            >
              {`${product.productName} ${product.quantity}${product.measure}`}
            </Typography>
          </Collapse>
        ))}
      </Box>
    </Box>
  )
};

export default RenderHistoryProduct;
