import { Button } from '@mui/material';
import React from 'react'

interface Iprops {
  title: string,
  page: string,
};

const Header: React.FC<Iprops> = ({ title = '', page }: Iprops) => {
  return (
    <header className="header">
      <h1>{ title !== 'Atualizar perfil' ? `Olá ${title}` : 'Atualizar perfil' }</h1>
      <Button>{ page }</Button>
    </header>
  )
};

export default Header;

