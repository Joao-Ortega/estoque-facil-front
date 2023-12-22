import { Alert, AlertTitle, Box, Button, CircularProgress, Collapse, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { UserInfosProvider } from '../../context/UserProvider'
import { checkInputField } from '../../functions/user';
import { Edit, EditNote, Visibility, VisibilityOff } from '@mui/icons-material';
import { IUserInfosDecoded } from '../../interfaces/userInterfaces';
import { IValidateObj } from '../../interfaces';
import { updateUser } from '../../api/user';
import { switchResponse } from '../../functions';

interface IProfileFormProps {
  isOpen: boolean;
  setIsOpen: Function;
  setUpdateSuccess: Function;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ isOpen, setIsOpen, setUpdateSuccess }: IProfileFormProps) => {
  const [currentUserInfos, setCurrentUserInfos] = useState<IUserInfosDecoded | null>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [disableFields, setDisableFields] = useState<boolean[]>([true, true, true]);
  const [password, setPassword] = useState<string>('');
  const [seePass, setSeePass] = useState<boolean>(false);
  const [errorOnUpdate, setErrorOnUpdate] = useState<IValidateObj>({ error: false, message: '' });
  const [isInputPasswordFocus, setIsInputPasswordFocus] = useState<boolean>(false);
  const [dataSend, setDataSend] = useState<boolean>(false);
  const { user, getPersonalInfos, decodeUser } = UserInfosProvider();

  useEffect(() => {
    if (!isOpen) {
      setDisableFields([true, true, true]);
      setErrorOnUpdate({ error: false, message: '' });
      setSeePass(false);
      setPassword('');
    } else {
      getUserInfos()
    }
  }, [isOpen]);

  const getUserInfos = () => {
    const infos = getPersonalInfos(user.token)
    setCurrentUserInfos(infos)
    setEmail(infos.email)
    setName(infos.name)
  }

  const checkChangedFields = () => {
    const controlFields = [{email}, {name}, {password}]
    let fieldsToUpdate = {}
    for (let i = 0; i < disableFields.length; i++) {
      if (!disableFields[i]) {
        const validation = checkInputField(controlFields[i])
        if (validation.error) {
          setErrorOnUpdate(validation)
          setTimeout(() => { setErrorOnUpdate({ error: false, message: '' }) }, 3500)
          return;
        }
        fieldsToUpdate = { ...fieldsToUpdate, ...controlFields[i] }
      } else continue 
    }
    return fieldsToUpdate;
  }

  const isSameInfos = (fields: any): any => {
    if (fields.email && currentUserInfos?.email === fields.email) {
      delete fields.email
    }
    if (fields.name && currentUserInfos?.name === fields.name) {
      delete fields.name
    }
    return fields
  }

  const handleUpdate = async () => {
    setDataSend(true)
    const fields = checkChangedFields();
    if (fields) {
      const treatedFields = isSameInfos(fields);
      const updated = await updateUser(treatedFields);
      if (updated.code !== 200) {
        const message = switchResponse(updated.message)
        setErrorOnUpdate({ error: true, message });
        setDataSend(false);
        setTimeout(() => { setErrorOnUpdate({ error: false, message: '' }) }, 3500);
        return;
      }
      if (updated.token) {
        decodeUser(updated.token)
      }
    } else {
      setDataSend(false);
      return
    }
    setDataSend(false);
    setIsOpen(false);
    setUpdateSuccess(true);
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: 1,
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center' margin='2% 0'>
        <Typography sx={{ minWidth: 70 }}>EMAIL</Typography>
        <TextField
          size='small'
          value={email}
          disabled={disableFields[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'white', borderRadius: 2, maxWidth: 220 }}
        />
        <Edit
          onClick={() => {
            const copyState = [...disableFields]
            copyState[0] = !copyState[0]
            setDisableFields(copyState)
          }}
          fontSize='medium'
          color='warning'
        />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' margin='2% 0'>
        <Typography sx={{ minWidth: 50 }}>APELIDO</Typography>
        <TextField
          size='small'
          value={name}
          disabled={disableFields[1]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'white', borderRadius: 2, maxWidth: 220 }}
        />
        <Edit
          onClick={() => {
            const copyState = [...disableFields]
            copyState[1] = !copyState[1]
            setDisableFields(copyState)
          }}
          fontSize='medium'
          color='warning'
        />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' margin='2% 0'>
        <Typography sx={{ minWidth: 70 }}>SENHA</Typography>
        <TextField
          size='small'
          value={password}
          type={seePass ? 'text' : 'password'}
          onFocus={() => setIsInputPasswordFocus(true)}
          onBlur={() => setIsInputPasswordFocus(false)}
          InputProps={{
            endAdornment: seePass ?
              (<Visibility sx={{ minWidth: 50 }} onClick={() => setSeePass(false)} />) :
              (<VisibilityOff sx={{ minWidth: 50 }} onClick={() => setSeePass(true)} />)
          }}
          disabled={disableFields[2]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'white', borderRadius: 2, maxWidth: 220 }}
        />
        <Edit
          onClick={() => {
            const copyState = [...disableFields]
            copyState[2] = !copyState[2]
            setDisableFields(copyState)
          }}
          fontSize='medium'
          color='warning'
        />
      </Box>
      <Collapse in={isInputPasswordFocus}>
        <Alert sx={{ margin: '2px 0' }} severity="info">
          Mínimo 7 caracteres - Mínimo 1 número
        </Alert>
      </Collapse>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          disabled={!disableFields.some((fieldDisable: boolean) => !fieldDisable)}
          color='success'
          variant='contained'
          onClick={handleUpdate}
        >
          { dataSend ? (<CircularProgress sx={{ color: 'white' }} size='30px' />) : 'Salvar' }
        </Button>
      </Box>
      { errorOnUpdate.error && (
        <Alert sx={{ margin: '3px 0 0 0' }} severity="error">
          { errorOnUpdate.message }
        </Alert>
      ) }
    </Box>
  )
}

export default ProfileForm;
