import { CheckBox } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface IRenderProductProps {
  product: any;
}

const RenderProduct: React.FC<IRenderProductProps> = ({ product }: IRenderProductProps) => {
  return (
    <Box display='flex' justifyContent='center' sx={{ margin: '0 auto 0 auto' }}>
      <Card
        sx={{
          height: '15vh',
          width: '85vw',
          margin: '2%',
          display: 'flex'
        }}
      >
        <Box
          sx={{
            // border: '1px solid black',
            //   height: '140',
            width: '30vw'
          }}
        >
          <CardMedia
            component='img'
            alt='meat image'
            height='100'
            image='https://t4.ftcdn.net/jpg/00/83/36/05/360_F_83360582_oxUzWNwMqPLewOONSG5V8Kb6kfmDkdeP.jpg'
          />
        </Box>
        <CardContent
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            // border: '1px solid green',
            width: '70%'
          }}
        >
          <Box display='flex' flexDirection='column'>
            <Typography>PRODUTO</Typography>
            <Typography>{product.productName}</Typography>
          </Box>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography>QTD</Typography>
            <Typography>{product.quantity}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RenderProduct;
