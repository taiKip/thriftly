import React from 'react'
import { Toolbar, Typography, AppBar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAppSelector } from '../app/hooks'
import { seletCurrentCategory } from '../features/page/pageInfoSlice'

const SmallScreenAppBar = () => {
  const theme = useTheme()
  const currentCategory = useAppSelector(seletCurrentCategory)

  return (
    <AppBar sx={{ position: 'fixed', left: 0, right: 0, display: { xs: 'block', sm: 'none' } }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          variant="h1"
          color={theme.palette.mode == 'dark' ? 'white' : 'inherit'}
          fontSize={'0.8em'}
          fontWeight={'bold'}>
          {currentCategory.name}
        </Typography>
        <Typography variant="h1" color={'#9575cd'} fontSize={'0.8em'} fontWeight={'bold'}>
          {currentCategory.description}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default SmallScreenAppBar
