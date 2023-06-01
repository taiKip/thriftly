import React, { ReactNode } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../app/hooks'
import { setPageInfo } from '../features/page/pageInfoSlice'

const EnhancedIconButton = ({
  route,
  text,
  icon,
  title,
  description
}: {
  route: string
  text: string
  icon: ReactNode
  title: string
  description: string
}) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const handleClick = () => {
    dispatch(setPageInfo({ name: title, description }))
    navigate(route)
  }
  return (
    <IconButton
      onClick={() => handleClick()}
      color="inherit"
      aria-label={text}
      sx={{ display: 'flex', flexDirection: 'column' }}>
      {icon}
      <Typography variant="h6" fontSize={'0.4em'}>
        {text}
      </Typography>
    </IconButton>
  )
}

export default EnhancedIconButton
