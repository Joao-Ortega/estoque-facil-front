import React, { useState } from 'react'
import Header from './Header';
import { UserInfosProvider } from '../context/UserProvider';
import '../style/loginPage.css';
import { Box, Collapse, Tooltip, Typography } from '@mui/material';
import ProfileForm from './Forms/ProfileForm';
import { Edit } from '@mui/icons-material';

const Profile = () => {
  const [openPersonalInfos, setOpenPersonaInfos] = useState<boolean>(false);
  const { user } = UserInfosProvider();

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
            // backgroundColor: 'black',
            // color: 'white',
            margin: '8px 4px 3px 4px',
            padding: 1
          }}
        >
          <Box
            display='flex'
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px 8px 2px 2px',
              padding: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, marginRight: 1 }}>Minha Conta</Typography>
            <Tooltip
              title='Editar informações pessoais'
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenPersonaInfos(!openPersonalInfos)}
            >
              <Edit color='info' />
            </Tooltip>
          </Box>
          <Collapse
            in={openPersonalInfos}
            timeout={600}
          >
            <ProfileForm isOpen={openPersonalInfos} />
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
