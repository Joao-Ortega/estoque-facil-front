import { Logout,  } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'

interface Iprops {
  title: string,
  page: string,
};

const Header: React.FC<Iprops> = ({ title, page }: Iprops) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/profile');
  }

  const handleLogOut = () => {
    handleClose();
    localStorage.clear();
    router.push('/');
  }

  const treatNickname = (): string => {
    const listName = title.split(' ');
    if (listName.length > 1) return `${listName[0][0].toUpperCase()}${listName[1][0].toUpperCase()}`
    return `${listName[0][0].toUpperCase()}${listName[0][1].toUpperCase()}`;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        top: 0,
        zIndex: 1,
        width: '100vw',
        height: '8vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'space-evenly',
          width: '70%'
        }}
      >
        <Box
          onClick={() => {
          if (window.location.pathname !== '/home') {
            router.push('/home')
          }
          }}
        >
          <Typography sx={{ minWidth: 100 }}>Minhas Listas</Typography>
        </Box>
        <Box
          onClick={() => {
            if (window.location.pathname !== '/newList') {
              router.push('/newList')
            }
          }}
        >
          <Typography sx={{ minWidth: 100 }}>Criar Lista</Typography>
        </Box>
      </Box>
      <Box>
        <Tooltip title="Configurações de Perfil">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 35, height: 35, backgroundColor: 'white', color: 'black' }}>{ treatNickname() }</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar sx={{ marginRight: 2 }} /> Perfil
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  )
};

export default Header;

