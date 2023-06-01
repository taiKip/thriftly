import { Login } from '@mui/icons-material'
import { Button, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setPageInfo } from '../features/page/pageInfoSlice'

const LoginButton = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const handleLogin = () => {
    dispatch(setPageInfo({ name: 'login', description: 'Login in to track your basket' }))
    navigate('/auth/login')
  }
  return (
    <Button color="secondary" variant="contained" endIcon={<Login />} onClick={handleLogin}>
      Login
    </Button>
  )
}

export default LoginButton
