import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Container } from '@mui/system'
import Header from './Header'
import FooterMenu from './FooterMenu'

const Layout = () => {
  return (
    <Container sx={{ minHeight: '100vh', padding: { xs: 0 } }}>
      <Header />
      <Container sx={{ padding: { xs: 1, sm: 'none' } }}>
        <Outlet />
      </Container>
      <FooterMenu />
    </Container>
  )
}

export default Layout
