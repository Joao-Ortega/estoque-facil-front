import { Box, Container, Input } from '@mui/material'
import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  return (
    <Box>
      <Box sx={{ border: '1px solid black' }}>
        <Input
          placeholder='Email'
          required
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          // sx={{ border: '1px solid black' }}
          
        />
      </Box>

    </Box>
  )
}
