import { CircularProgress, Container } from '@mui/material';
import React from 'react'

interface ILoadingProps {
  color: string;
  size: string;
}

const Loading: React.FC<ILoadingProps> = ({ color = 'black', size }: ILoadingProps) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100vw'
      }}
    >
      <CircularProgress
        sx={{ color: color }}
        size={size}
      />
    </Container>
  )
}

export default Loading;