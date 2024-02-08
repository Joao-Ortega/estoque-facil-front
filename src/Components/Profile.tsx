import React, { useEffect, useState } from 'react'
import Header from './Header';
import { UserInfosProvider } from '../context/UserProvider';
import '../style/loginPage.css';
import { Box, Collapse, Tooltip, Typography } from '@mui/material';
import ProfileForm from './Forms/ProfileForm';
import { ArrowDropDown, ArrowDropUp, Check, Edit } from '@mui/icons-material';
import RenderHistoryProduct from './HistoryList';


const Profile = () => {
  const { user } = UserInfosProvider();
  const [openPersonalInfos, setOpenPersonaInfos] = useState<boolean>(false);
  const [openPersonalization, setOpenPersonalization] = useState<boolean>(false);
  const [openHistory, setOpenHistory] = useState<boolean>(false);
  const [infosUpdated, setInfosUpdated] = useState<boolean>(false);
  const [listProductsHistory, setListProductsHistory] = useState<any>([]);

  useEffect(() => {
    setTimeout(() => {
      setInfosUpdated(false);
    }, 3000)
  }, [infosUpdated])

  useEffect(() => {
    // pegar lista de produtos no localStorage
    const list = localStorage.getItem('listHistoryProducts');
    if (list) {
      setListProductsHistory(JSON.parse(list));
    }
  }, [])

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
            onClick={() => setOpenPersonalization(!openPersonalization)}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Personalização</Typography>
            <Tooltip title='Editar informações pessoais'>
              { openPersonalization ? (<ArrowDropUp fontSize='large' />) : (<ArrowDropDown fontSize='large' />) }
            </Tooltip>
            { infosUpdated && <Typography sx={{ fontSize: 15, marginLeft: 2, marginRight: 1.5 }}>Dados Atualizados!</Typography> }
            { infosUpdated && <Check color='success' /> }
          </Box>
          <Collapse
            in={openPersonalization}
            timeout={600}
          >
            {/* Componente de Personalização */}
            <Box
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: 1,
              }}
            >
              Personalização
            </Box>
            {/* Componente de Personalização */}
          </Collapse>
        </Box>
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
              cursor: 'pointer',
            }}
            onClick={() => setOpenHistory(!openHistory)}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Histórico de Compras</Typography>
            <Tooltip title='Editar informações pessoais'>
              { openHistory ? (<ArrowDropUp fontSize='large' />) : (<ArrowDropDown fontSize='large' />) }
            </Tooltip>
            { infosUpdated && <Typography sx={{ fontSize: 15, marginLeft: 2, marginRight: 1.5 }}>Dados Atualizados!</Typography> }
            { infosUpdated && <Check color='success' /> }
          </Box>
          <Collapse
            in={openHistory}
            timeout={600}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 1,
                maxHeight: '330px',
                overflowY: 'auto',
              }}
            >
              {/* Componente de Personalização */}
              {listProductsHistory.map((list: any, i: number) => (<RenderHistoryProduct key={i} list={list} />))}
              {/* Componente de Personalização */}
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile;
