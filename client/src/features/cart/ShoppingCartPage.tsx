/**@todo too much code */
import { v4 as uuidv4 } from 'uuid'

import {
  Menu,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  CardHeader,
  Button,
  TableContainer,
  Toolbar,
  List,
  ListItem,
  Avatar,
  ListItemText,
  Stack
} from '@mui/material'
import { ArrowBack, Login } from '@mui/icons-material'
import CartItem from './CartItem'
import SignUp from '../auth/SignUpForm'
import { resetCart } from './cartSlice'
import { usePlaceOrderMutation } from '../orders/orderApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { IOrder, IOrderItem } from '../../interfaces'
import SignUpButton from '../../components/SignUpButton'
import { useNavigate } from 'react-router-dom'
import UseTheme from '../../utils/hooks/UseTheme'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import CartItemsList from './CartItemsList'
import useAuth from '../../utils/hooks/useAuth'

const nav = ['PRODUCT DETAILS', 'QUANTITY', 'TOTAL', 'ACTION']
export type cartPropsType = { anchorEl?: null | HTMLElement; handleClose?: () => void }
const ShoppingCartPage = ({ anchorEl, handleClose }: cartPropsType) => {
  const { isUser, isAdmin, isManager } = useAuth()
  const { theme } = UseTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [placeOrder, { isLoading }] = usePlaceOrderMutation()
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  const count = cartItems.length
  const { isBanned, name } = useAuth()
  const totalAmount = cartItems.map((item) => item.quantity * item.price)
  const handleCheckOut = () => {
    if (isAdmin || isManager || isUser) {
      navigate('/orders')
    } else {
      navigate('/auth/register')
    }
  }
  return (
    <>
      <SmallScreenAppBar />
      <Container sx={{ paddingTop: 10, overflowX: 'hidden', marginBottom: 8 }}>
        <Box padding={2}>
          <Typography variant="h4" color={'text.primary'} fontSize={'1.4em'} gap={2}>
            <span>Your Shopping Cart </span> <span>🛒</span>
          </Typography>
          <Typography sx={{ color: 'gray' }}>
            {`There is currently ${count} item${count > 1 ? 's' : ''} in the cart`}
          </Typography>
        </Box>
        {/**@todo fix cart  */}
        <Table>
          <TableHead>
            <TableRow>
              {nav.map((item) => (
                <TableCell key={item} align="center">
                  <Typography sx={{ fontSize: { xs: '0.5em' } }}>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <CartItem
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                price={item.price}
                name={item.name}
                key={item.id}
                description={item.description}
                id={item.id}
                stock={item.stock}
              />
            ))}
          </TableBody>
        </Table>
        <Container
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: 1,
            marginBottom: 1
          }}>
          <Box display={'flex'} gap={2} width={'80vw'} justifyContent={'space-around'}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleClose}
              color="secondary"
              variant="text">
              Continue Shopping
            </Button>

            <Button
              endIcon={<Login />}
              onClick={handleCheckOut}
              color="secondary"
              variant="outlined">
              Checkout 🛍️
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  )
}
export default ShoppingCartPage
