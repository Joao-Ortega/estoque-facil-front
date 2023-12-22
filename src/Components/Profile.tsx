import React, { useEffect, useState } from 'react'
import Header from './Header';
import { UserInfosProvider } from '../context/UserProvider';
import '../style/loginPage.css';
import { Box, Collapse, Tooltip, Typography } from '@mui/material';
import ProfileForm from './Forms/ProfileForm';
import { ArrowDropDown, ArrowDropUp, Check, Edit } from '@mui/icons-material';

const Profile = () => {
  const [openPersonalInfos, setOpenPersonaInfos] = useState<boolean>(false);
  const [infosUpdated, setInfosUpdated] = useState<boolean>(false);
  const { user } = UserInfosProvider();

  useEffect(() => {
    setTimeout(() => {
      setInfosUpdated(false);
    }, 3000)
  }, [infosUpdated])

  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: '100vh',
        marginTop: 8,
      }}
    >
      <Header title={ user ? user.name : 'P F'} page="home" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            margin: '8px 4px 3px 4px',
            padding: 1
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px 8px 2px 2px',
              padding: 1.5,
              cursor: 'pointer'
            }}
            onClick={() => setOpenPersonaInfos(!openPersonalInfos)}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Minha Conta</Typography>
            <Tooltip title='Editar informações pessoais'>
              { openPersonalInfos ? (<ArrowDropUp fontSize='large' />) : (<ArrowDropDown fontSize='large' />) }
            </Tooltip>
            { infosUpdated && <Typography sx={{ fontSize: 15, marginLeft: 2, marginRight: 1.5 }}>Dados Atualizados!</Typography> }
            { infosUpdated && <Check color='success' /> }
          </Box>
          <Collapse
            in={openPersonalInfos}
            timeout={600}
          >
            <ProfileForm
              isOpen={openPersonalInfos}
              setIsOpen={setOpenPersonaInfos}
              setUpdateSuccess={setInfosUpdated}
            />
          </Collapse>
        </Box>
        <Box
          sx={{
            backgroundColor: 'black',
            color: 'white',
            margin: '8px 4px 3px 4px',
            padding: 1
          }}
        >
          <Typography>Personalização</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'black',
            color: 'white',
            margin: '8px 4px 3px 4px',
            padding: 1
          }}
        >
          <Typography>Histórico de Compras</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile;
