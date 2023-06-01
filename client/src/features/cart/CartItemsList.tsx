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
  createTheme
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
import { selectCurrentUserToken } from '../auth/authSlice'
import useAuth from '../../utils/hooks/useAuth'

export type cartPropsType = { anchorEl: null | HTMLElement; handleClose: () => void }
const nav = ['PRODUCT DETAILS', 'QUANTITY', 'TOTAL', 'ACTION']
const CartItemsList = ({ anchorEl, handleClose }: cartPropsType) => {
  const token = useAppSelector(selectCurrentUserToken)
  const dispatch = useAppDispatch()
  //const user = useAppSelector(selectCurrentUser)
  const [placeOrder, { data }] = usePlaceOrderMutation()
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  const count = cartItems.length

  const handleOrder = async () => {
    if (token && count !== 0) {
      ///user
      // eslint-disable-next-line prettier/prettier, prefer-const
      let orderItems: IOrderItem[] = []
      cartItems.map((item) => orderItems.push({ productId: +item.id, quantity: +item.quantity }))
      const order: IOrder = {
        orderItems: [...orderItems],
        addressId: 1
      }

      try {
        console.log(order)
        const result = await placeOrder(order).unwrap()
        console.log('response::', result)
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(resetCart())
        handleClose()
      }
    }
  }
  return (
    <>
      <Menu
        id="menu-appbar"
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <Container
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            marginBottom: 1
          }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'purple' }}>
              Your Shopping Cart
            </Typography>
            <Typography sx={{ color: 'gray' }}>
              {`There is currently ${count} item${count > 1 ? 's' : ''} in the cart`}
            </Typography>
          </Box>
        </Container>
        <Table>
          <TableHead>
            <TableRow>
              {nav.map((item) => (
                <TableCell key={item} align="center">
                  <Typography>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <CartItem
                image={item.image}
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
          <Box display={'flex'} alignItems="center" gap={2}>
            <IconButton onClick={handleClose}>
              <ArrowBack />
            </IconButton>

            <Typography variant="h6">Continue Shopping</Typography>
          </Box>
          {!token && ( //not user
            <>
              <Typography color="ButtonHighlight">Login to checkout</Typography>
              <SignUpButton handleCloseCart={handleClose} anchorEl={Boolean(anchorEl)} />
            </>
          )}
          <>
            {cartItems.length > 0 &&
              token && ( //not user
                <Button variant="outlined" color="inherit" onClick={handleOrder}>
                  Checkout 🛍️
                </Button>
              )}
          </>
        </Container>
      </Menu>
    </>
  )
}

export default CartItemsList
