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
  ListItemText
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import CartItem from './CartItem'
import SignUp from '../auth/SignUpForm'
import { resetCart } from './cartSlice'
import { usePlaceOrderMutation } from '../orders/orderSlice'
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
  const { theme } = UseTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [placeOrder, { isLoading }] = usePlaceOrderMutation()
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  const count = cartItems.length
  const { isBanned, name } = useAuth()
  const totalAmount = cartItems.map((item) => item.quantity * item.price)
  const handleOrder = async () => {
    if (!isBanned && name && count !== 0) {
      const orderItems: IOrderItem[] = []
      cartItems.map((item) => orderItems.push({ productId: +item.id, quantity: item.quantity }))
      const order: IOrder = {
        orderItems: [...orderItems],
        addressId: 1
      }
      try {
        await placeOrder(order).unwrap()
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(resetCart())
        navigate('/')
      }
    }
  }
  return (
    <>
      <SmallScreenAppBar />
      <Container sx={{ paddingTop: 16, overflowX: 'hidden' }}>
        <Box padding={2}>
          <Typography variant="h4" color={'white'} fontSize={'1.4em'} gap={2}>
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
          <Box display={'flex'} alignItems="flex-start" flexDirection={'column'} gap={2}>
            <IconButton onClick={handleClose}>
              <ArrowBack />
            </IconButton>

            <Typography variant="h6">Continue Shopping</Typography>
            <Typography color="purple">Login to checkout</Typography>
          </Box>
          {
            //not user
            <>
              <SignUpButton handleCloseCart={handleClose} anchorEl={Boolean(anchorEl)} />
            </>
          }
          <>
            {cartItems.length < 0 && ( //not user
              <Button variant="outlined" color="inherit" onClick={handleOrder}>
                Checkout 🛍️
              </Button>
            )}
          </>
        </Container>
      </Container>
    </>
  )
}
export default ShoppingCartPage
