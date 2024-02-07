import { Box, Card, CardContent, Typography, Checkbox } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/products';

interface IRenderProductProps {
  product: IProduct;
}

const RenderProduct: React.FC<IRenderProductProps> = ({ product }: IRenderProductProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(product.checked);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    product.checked = event.target.checked;
    setChecked(event.target.checked);
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ margin: '0 auto 0 auto' }}>
      <Card
        sx={{
          height: '6vh',
          width: '85vw',
          margin: '2%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '5px 5px',
          borderRadius: '10px 20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        <Checkbox
          sx={{
            color: green[800],
            '&.Mui-checked': {
              color: green[600],
            },
            width: '30px',
            height: '30px',
          }}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        ></Checkbox>
        </Box>
        <CardContent
          sx={{
            alignItems: 'center',
            display: 'flex',
            marginTop: '6px',
            justifyContent: 'space-between',
            width: '60%'
          }}
        >
          <Typography>{`${product.productName.charAt(0).toUpperCase()}${product.productName.slice(1)}`}</Typography>
          <Box
            sx={{
              display: 'flex',
              width: '28%',
              justifyContent: 'center'
            }}
          >
          <Typography>{`${product.quantity}`}</Typography>
          <Typography>{`${product.measure}`}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RenderProduct;
