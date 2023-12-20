import { Box, Button, Fade, Slide, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserInfosProvider } from '../../context/UserProvider'

const ProfileForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [missingInfos, setMissingInfos] = useState<boolean>(true);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { user, getPersonalInfos } = UserInfosProvider();

  useEffect(() => {
    console.log('user', getPersonalInfos(user.token))
  }, [])

  return (
    // <Slide>
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: 1,
        }}
      >
        <Box display='flex' justifyContent='space-evenly' alignItems='center' margin='2% 0'>
          <Typography sx={{ minWidth: 100 }}>EMAIL</Typography>
          <TextField
            size='small'
            sx={{ color:  'white', backgroundColor: 'white', borderRadius: 2  }}
          />
        </Box>
        <Box display='flex' justifyContent='space-evenly' alignItems='center' margin='2% 0'>
          <Typography sx={{ minWidth: 100 }}>APELIDO</Typography>
          <TextField
            size='small'
            sx={{ color:  'white', backgroundColor: 'white', borderRadius: 2  }}
          />
        </Box>
        <Box display='flex' justifyContent='space-evenly' alignItems='center' margin='2% 0'>
          <Typography sx={{ minWidth: 100 }}>SENHA</Typography>
          <TextField
            size='small'
            sx={{ color:  'white', backgroundColor: 'white', borderRadius: 2  }}
          />
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='outlined'
            onClick={() => {
              if (!isEditMode) {
                setEditMode(true)
              }
            }}
            sx={{ marginRight: 1 }}
          >
            Editar
          </Button>
          <Button
            disabled={missingInfos}
            color='success'
            variant='outlined'
            onClick={() => {
              if (!isEditMode) {
                setEditMode(true)
              }
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    // </Slide>
  )
}

export default ProfileForm;
