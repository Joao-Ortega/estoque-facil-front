import { Box, Button, Checkbox, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { IProduct } from "../../interfaces/products";
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import './finishStyleModal.css';

interface FinishListModalProps {
  list: IProduct[];
  listName: string;
  confirmed: (valueTotal: string) => void;
  canceled: () => void;
}

const FinishListModal = ({ list, listName, confirmed, canceled }: FinishListModalProps) => {
  const [disabled, setDisabled] = useState(true);
  const [totalValue, setTotalValue] = useState('');
  const [helperText, setHelperText] = useState('Ex: 9,99, 100,00');
  const [checked, setChecked] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalValue(e.target.value);
  };

  const handleDisabled = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (totalValue) {
        setDisabled(!disabled);
        setChecked(e.target.checked);
      } else {
        setHelperText('Insira um valor');
        setTimeout(() => {
          setHelperText('Ex: 9,99, 100,00');
        }, 2000);
      }
    } else {
      setDisabled(true);
      setChecked(e.target.checked);
    }
  };

  return (
    <Box
      sx={{
        height: '55vh',
        width: '90%',
        backgroundColor: '#DCDCDC',
        borderRadius: '10px',
        border: '1px solid #000',
        position: 'absolute',
        top: '20%',
        zIndex: 2,
        boxShadow: '15px 30px 30px #000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center'
          }}
        >
          {`Lista: ${listName.charAt(0).toUpperCase() + listName.slice(1)}`}
        </Typography>
      </Box>
      <Box
        sx={{
          height: '70%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0px'
        }}
      >
        <Typography
          paragraph={true}
          sx={{
            fontSize: '12px',
            color: list.length ? '#FF0000' : '#00BB00',
          }}
        >{ list.length ? 'Obs: Lista de Produtos não comprados!' : 'Parabéns, todos os produtos foram comprados!'}
        </Typography>
        <Box
          sx={{
            width: '90%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <List
            sx={{
              width: '80%',
              height: '70%',
              border: '1px solid #000',
              borderRadius: '10px',
              overflowY: 'scroll',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {list.length ? (
              list.map((product, i) => (
                <ListItem
                  key={i}
                  sx={{
                    backgroundColor: 'white',
                    margin: '5px 0px',
                    borderRadius: '10px',
                    border: '1px solid #000',
                  }}
                >
                  <ListItemText>{`${product.productName} ${product.quantity}${product.measure}`}</ListItemText>
                </ListItem>
              ))
            ) : (
              <Typography
                sx={{
                  display: 'flex',
                  margin: 'auto 0px',
                  alignSelf: 'center'
                }}
                paragraph={true}
              >Lista Vazia</Typography>
            )}
          </List>
          <Box
            sx={{
              width: '100%',
              height: '30%',
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}
          >
            <TextField
              label="Valor Total"
              variant="outlined"
              type='number'
              size="small"
              helperText={helperText}
              onChange={handleChange}
              sx={{
                width: '50%',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
          }}
        >
          <Checkbox
            checked={checked}
            onChange={handleDisabled}
          />
          <Typography
            paragraph={true}
            sx={{
              fontSize: '12px',
              color: '#0000FF',
              margin: 'auto 0px',
            }}
          >Realmente deseja finalizar sua compra?</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          onClick={canceled}
        >Cancelar</Button>
        <Button
          variant='contained'
          disabled={disabled}
          sx={{
            margin: '0 auto 0 auto',
            width: '30%',
            height: '4vh',
            color: '#fff',
          }}
          onClick={() => {confirmed(totalValue)}}
        >Confirmar</Button>
      </Box>
    </Box>
  );
};

export default FinishListModal;
