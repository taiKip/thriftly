import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetCart, selectAllOrders } from '../cart/cartSlice'
import { resetOrderItems, selectOrderAddress } from './orderSlice'
import { IOrder, ICartItem } from '../../interfaces'
import { usePlaceOrderMutation } from './orderApiSlice'
import ErrorAlert from '../../components/error/ErrorAlert'
import { useGetDefaultUserAddressQuery } from '../address/addressSlice'
import { useNavigate } from 'react-router-dom'

const OrderItems = () => {
  const cartItems = useAppSelector(selectAllOrders)
  const addressId = useAppSelector(selectOrderAddress)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [placeOrder, { isLoading, isSuccess, isError }] = usePlaceOrderMutation()

  const { data } = useGetDefaultUserAddressQuery()

  const [error, setError] = useState('')
  let total = 0
  cartItems.map((item) => {
    total += item.quantity * item.price
  })
  let userAddress = addressId
  const handlePlaceOrder = async () => {
    const orderItems: ICartItem[] = []
    cartItems.map((item) => orderItems.push({ quantity: item.quantity, productId: item.id }))
    /**
     * @desc user default user address if user hasn't changed address
     */
    if (addressId == null) {
      userAddress = data?.id as number
    }
    const newOrder: IOrder = { addressId: userAddress, orderItems }
    console.log(newOrder)
    await placeOrder(newOrder)
      .unwrap()
      .then((payload) => {
        console.log(payload)
        dispatch(resetCart())
        dispatch(resetOrderItems())
      })
      .catch((err) => {
        /**@todo use array insted  to capture all errors */
        if (err.status) {
          //  setError(`${err.data[0].httpStatus} :: ${err.data[0].message}`)
          console.log(err)
        }
      })
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess && data) {
        navigate('/', { replace: true })
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [isLoading])
  return (
    <>
      <Snackbar
        open={isSuccess}
        autoHideDuration={1000}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Order placed 🛍️
        </Alert>
      </Snackbar>
      <ErrorAlert error={error} />
      <Container
        disableGutters
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
          gap: 2,
          padding: 0,
          overflow: 'scroll'
        }}>
        <Box sx={{ border: '1px solid gray', borderRadius: 2, padding: 2 }}>
          <Typography
            color="text.primary"
            sx={{ fontWeight: '500', fontSize: { xs: '0.9em', sm: '1.8em' } }}>
            Items
          </Typography>
          <List>
            {cartItems &&
              cartItems.map((item) => (
                <ListItem key={item.id} sx={{ width: '100%', display: 'flex', gap: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: { xs: 50, sm: 60 },
                      width: { xs: 50, sm: 60 },
                      borderRadius: 1
                    }}
                    image={item.imageUrl ?? ' '}
                  />
                  <Typography color="text.primary">{item.name}</Typography>
                </ListItem>
              ))}
          </List>
        </Box>

        <Box
          sx={{
            border: '1px solid gray',
            borderRadius: 2,
            padding: 2,
            gap: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}>
          <Typography fontWeight="bold" color="text.primary">
            Order summary
          </Typography>
          <Box
            component={'span'}
            display={'flex'}
            justifyContent={'space-between'}
            sx={{ borderBottom: '1px solid grey' }}>
            <Typography color="text.primary">Total</Typography>
            <Typography color="text.primary">€{total.toFixed(2)}</Typography>
          </Box>
          <Button variant="contained" color="warning" onClick={handlePlaceOrder}>
            Pay and place your order
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default OrderItems
