import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import React from 'react';
import { createNewUserList } from '../../api/user';

interface ISaveListProps {
  open: boolean;
  setOpen: Function;
  listName: string;
  productsList: any[];
  isSaving: Function;
  setResponse: Function;
}

const SaveListModal: React.FC<ISaveListProps> = ({ open, setOpen, listName, productsList, isSaving, setResponse }: ISaveListProps) => {

  const handleClose = () => setOpen(false);

  const saveList = async () => {
    isSaving(true);
    const infosToSave = {
      listName,
      productsList
    };
    const response = await createNewUserList(infosToSave)
    isSaving(false);
    setResponse(response.code)
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
