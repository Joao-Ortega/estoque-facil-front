import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import React from 'react';

interface ISaveListProps {
  open: boolean;
  setOpen: Function;
  listName: string;
  productsList: any[];
}

const SaveListModal: React.FC<ISaveListProps> = ({ open, setOpen, listName, productsList }: ISaveListProps) => {

  const handleClose = () => setOpen(false);

  const saveList = () => {
    const infosToSave = {
      listName,
      productsList
    };
    console.log('infosToSave', infosToSave)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {"Salvando Lista"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ao salvar a lista, ela se tornará sua lista ativa e aparecerá no menu Minhas Listas.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose}>Cancelar</Button>
        <Button color='success' onClick={saveList} autoFocus>
          Ativar Lista
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default SaveListModal;
