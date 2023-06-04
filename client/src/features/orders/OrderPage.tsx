import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { useAppSelector } from '../../app/hooks'
import { selectAllOrders } from '../cart/cartSlice'
import AddNewAddress from '../address/AddNewAddress'
import OrderItems from './OrderItems'
import DefaultAddress from '../address/DefaultAddress'
import AddressList from '../address/AddressList'

const OrderPage = () => {
  const cartItems = useAppSelector(selectAllOrders)
  const [changeAddress, setChangAddress] = useState(false)
  const [open, setOpen] = useState(false)
  const handleChangeAddress = () => {
    setChangAddress((prev) => !prev)
  }
  return (
    <>
      <SmallScreenAppBar />
      <AddNewAddress open={open} handleClose={() => setOpen((prev) => !prev)} />
      <Container sx={{ overflow: 'scroll', marginBottom: 10 }}>
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Box marginTop={3} display="flex" flexDirection={'column'}>
          <Stack>
            <Typography
              color={`text.primary`}
              variant="h4"
              sx={{ fontWeight: '500', fontSize: { xs: '1.2em', sm: '2em' } }}>
              Checkout
            </Typography>
            <Typography variant="subtitle1" color="GrayText">
              {`Checkout ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} `}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ border: '1px solid grey', borderRadius: 2, marginBottom: 2, padding: 2 }}>
          {!changeAddress && <DefaultAddress toggle={handleChangeAddress} />}
          {changeAddress && <AddressList toggle={handleChangeAddress} />}
        </Box>
        <Box>
          <OrderItems />
        </Box>
      </Container>
    </>
  )
}

export default OrderPage
