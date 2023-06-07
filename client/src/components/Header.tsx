import { useContext, useState, MouseEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import RssFeedIcon from '@mui/icons-material/RssFeed'

import { useTheme } from '@mui/material/styles'
import { AppBar, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import FlareIcon from '@mui/icons-material/Flare'
import { Avatar, Badge, Button, CardHeader, IconButton, Menu, MenuItem } from '@mui/material'
import {
  DarkModeOutlined,
  Dashboard,
  MailOutline,
  ShoppingCartCheckoutOutlined
} from '@mui/icons-material'
import { ThemeContext } from '../App'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CartItemsList from '../features/cart/CartItemsList'
import { selectCurrentUserToken } from '../features/auth/authSlice'

import SignUpButton from './SignUpButton'
import { navItems } from '../utils/functions/extraValues'
import LoginButton from './LoginButton'
import useAuth from '../utils/hooks/useAuth'
import { useLogOutUserMutation } from '../features/auth/authApiSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const colorMode = useContext(ThemeContext)
  const theme = useTheme()
  /**@todo - rarefactor after connecting to rest endpoint */
  //user = useAppSelector(selectCurrentUser)
  const { accessToken } = useAppSelector(selectCurrentUserToken)
  const [logout, { isError }] = useLogOutUserMutation()
  const cartItems = useAppSelector((state) => state.cart.cartItems)
  //const [userData , setUserData] = useState(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const { isAdmin, isManager, isUser, isBanned, name } = useAuth()
  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [accessToken])

  const handleCloseCart = () => {
    setCartAnchorEl(null)
  }

  const handleCart = (event: MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget)
  }

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    navigate('/profile')
    setAnchorEl(null)
  }
  const handleLogout = () => {
    console.log('logout')
    setAnchorEl(null)
    setIsLoggedIn(false)

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    logout(null)
    navigate('/')
  }
  let title = ''
  if (isAdmin) {
    title = 'Admin'
  } else if (isManager) {
    title = 'Manager'
  } else {
    title = 'User'
  }
  return (
    <AppBar elevation={0} position="sticky" sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Toolbar>
        <Link to={'/'}>
          <Dashboard sx={{ mr: 5 }} />
        </Link>

        <Box sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}>
          {isAdmin && (
            <>
              <Link to={'users'}>
                <Button color="inherit">users</Button>
              </Link>
              <Link to={'categories'}>
                <Button color="inherit">categories</Button>
              </Link>

              <Link to={'dashboard'}>
                <Button color="inherit">dashboard</Button>
              </Link>
            </>
          )}
        </Box>
        <Link to={'/blog'}>
          <Button color="inherit" endIcon={<RssFeedIcon color="secondary" />}>
            Blog
          </Button>
        </Link>
        <Box gap={2} display={'flex'} marginX={2}>
          {(isManager || isAdmin) && (
            <IconButton
              size="medium"
              aria-label="show all 2 new notifications"
              color="inherit"
              sx={{ borderRadius: 1 }}>
              <Badge badgeContent={2} color="success">
                <MailOutline />
              </Badge>
            </IconButton>
          )}

          <IconButton
            size="medium"
            aria-label="notifications"
            color="inherit"
            onClick={handleCart}
            sx={{
              borderRadius: 1
            }}>
            <Badge badgeContent={cartItems.length} color={'secondary'}>
              <ShoppingCartCheckoutOutlined />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'light' ? <DarkModeOutlined /> : <FlareIcon />}
          </IconButton>
        </Box>
        {!isLoggedIn && (
          <div
            style={{
              display: 'flex',
              gap: '8px'
            }}>
            <LoginButton />
            <SignUpButton />
          </div>
        )}
        {accessToken && isLoggedIn && (
          <CardHeader
            sx={{ cursor: 'pointer' }}
            onClick={handleMenu}
            avatar={<Avatar />}
            title={name}
            subheader={title}
          />
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          {accessToken && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
        </Menu>

        <CartItemsList anchorEl={cartAnchorEl} handleClose={handleCloseCart} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
