import { AppRegistrationOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setPageInfo } from '../features/page/pageInfoSlice'

const SignUpButton = ({
  handleCloseCart,
  anchorEl
}: {
  handleCloseCart?: () => void
  anchorEl?: boolean
}) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const handleClick = () => {
    if (anchorEl && handleCloseCart) {
      handleCloseCart()
    }
    dispatch(setPageInfo({ name: 'Sign Up', description: 'almost there' }))
    navigate('/auth/register')
  }
  return (
    <Button variant="contained" onClick={handleClick} endIcon={<AppRegistrationOutlined />}>
      Sign up
    </Button>
  )
}

export default SignUpButton
