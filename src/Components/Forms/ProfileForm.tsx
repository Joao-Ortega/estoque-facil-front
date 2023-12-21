import { Alert, AlertTitle, Box, Button, Collapse, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { UserInfosProvider } from '../../context/UserProvider'
import { checkInputField } from '../../functions/user';
import { EditNote, Visibility, VisibilityOff } from '@mui/icons-material';
import { IUserInfosDecoded } from '../../interfaces/userInterfaces';
import { IValidateObj } from '../../interfaces';

interface IProfileFormProps {
  isOpen: boolean;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ isOpen }: IProfileFormProps) => {
  const [currentUserInfos, setCurrentUserInfos] = useState<IUserInfosDecoded | null>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [disableFields, setDisableFields] = useState<boolean[]>([true, true, true]);
  const [password, setPassword] = useState<string>('');
  const [seePass, setSeePass] = useState<boolean>(false);
  const [errorOnUpdate, setErrorOnUpdate] = useState<IValidateObj>({ error: false, message: '' });
  const [isInputPasswordFocus, setIsInputPasswordFocus] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { user, getPersonalInfos } = UserInfosProvider();

  // useEffect(() => {
  //   verifyInfos()
  // }, [name, email, password]);

  useEffect(() => {
    if (!isOpen) {
      setEditMode(false);
      setDisableFields([true, true, true]);
      setErrorOnUpdate({ error: false, message: '' });
      setSeePass(false);
    }
  }, [isOpen]);

  useEffect(() => {
    getUserInfos()
  }, []);

  const getUserInfos = () => {
    const infos = getPersonalInfos(user.token)
    setCurrentUserInfos(infos)
    setEmail(infos.email)
    setName(infos.name)
  }

  const checkInfosChanged = () => {
    const controlFields = [{email}, {name}, {password}]
    for (let i = 0; i < disableFields.length; i++) {
      if (!disableFields[i]) {
        const validation = checkInputField(controlFields[i])
        if (validation.error) {
          setErrorOnUpdate(validation)
          setTimeout(() => { setErrorOnUpdate({ error: false, message: '' }) }, 3500)
          break;
        }
      } else continue 
    }
  }

  const handleUpdate = () => {
    checkInfosChanged();
    // console.log('email', email)
    // console.log('name', name)
    // console.log('password', password)
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
        <EditNote
          onClick={() => {
            if (disableFields[0]) {
              const copyState = [...disableFields]
              copyState[0] = false
              setDisableFields(copyState)
            }
          }}
          fontSize='medium'
          color='info'
          sx={{ minWidth: 50 }}
        />
        <TextField
          size='small'
          value={email}
          disabled={disableFields[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'white', borderRadius: 2, maxWidth: 220 }}
        />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' margin='2% 0'>
        <Typography sx={{ minWidth: 50 }}>APELIDO</Typography>
        <EditNote
          onClick={() => {
            if (disableFields[1]) {
              const copyState = [...disableFields]
              copyState[1] = false
              setDisableFields(copyState)
            }
          }}
          fontSize='medium'
          color='info'
          // sx={{ minWidth: 10 }}
        />
        <TextField
          size='small'
          value={name}
          disabled={disableFields[1]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'white', borderRadius: 2, maxWidth: 220 }}
        />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' margin='2% 0'>
        <Typography sx={{ minWidth: 70 }}>SENHA</Typography>
        {/* {seePass && <Visibility sx={{ minWidth: 50 }} onClick={() => setSeePass(false)} />}
        {!seePass && <VisibilityOff sx={{ minWidth: 50 }} onClick={() => setSeePass(true)} />} */}
        <EditNote
          onClick={() => {
            const copyState = [...disableFields]
            copyState[2] = !copyState[2]
            setDisableFields(copyState)
          }}
          fontSize='medium'
          color='info'
          sx={{ minWidth: 50 }}
        />
        <TextField
          size='small'
          value={password}
          type={seePass ? 'text' : 'password'}
          onFocus={() => setIsInputPasswordFocus(true)}
          onBlur={() => setIsInputPasswordFocus(false)}
          InputProps={{
            endAdornment: seePass ? (<Visibility sx={{ minWidth: 50 }} onClick={() => setSeePass(false)} />) : (<VisibilityOff sx={{ minWidth: 50 }} onClick={() => setSeePass(true)} />)
          }}
          disabled={disableFields[2]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          sx={{ color: 'white', backgroundColor: 'white', borderRadius: 2, maxWidth: 220 }}
        />
      </Box>
      <Collapse in={isInputPasswordFocus}>
        <Alert sx={{ margin: '2px 0' }} severity="info">
          Mínimo 7 caracteres - Mínimo 1 número
        </Alert>
      </Collapse>
      <Box display='flex' justifyContent='flex-end'>
        {/* <Button
          variant='outlined'
          onClick={() => {
            if (!isEditMode) {
              setEditMode(true)
            }
          }}
          sx={{ marginRight: 1 }}
        >
          Editar
        </Button> */}
        <Button
          disabled={!disableFields.some((fieldDisable: boolean) => !fieldDisable)}
          color='success'
          variant='contained'
          onClick={handleUpdate}
        >
          Salvar
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
