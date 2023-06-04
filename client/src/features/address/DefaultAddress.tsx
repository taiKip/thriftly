import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { useGetAddressesByUserIdQuery, useGetDefaultUserAddressQuery } from './addressSlice'
import TitleSkeleton from '../../components/skeletons/TitleSkeleton'
import SpanSkeleton from '../../components/skeletons/SpanSkeleton'
import SomethingWentWrong from '../../components/error/SomethingWentWrong'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addOrderAddress, selectOrderAddress } from '../orders/orderSlice'
import { IAddress, IOrder } from '../../interfaces'
import { useEffect } from 'react'

const DefaultAddress = ({ toggle }: { toggle: () => void }) => {
  const { data, isLoading, isError, isSuccess } = useGetDefaultUserAddressQuery()
  const dispatch = useAppDispatch()
  /**
   * @desc Check local state if user has selected any address? use it as delivery address: use default address
   */
  const deliveryAddressId = useAppSelector(selectOrderAddress)
  let newDeliveryAddress = data as IAddress
  console.log(deliveryAddressId)
  if (deliveryAddressId !== null) {
    const { address } = useGetAddressesByUserIdQuery(undefined, {
      selectFromResult: ({ data, isLoading }) => ({
        address: data?.find((item) => item.id === deliveryAddressId),
        isLoading
      })
    })
    newDeliveryAddress = address as IAddress
  }

  return (
    <>
      {isLoading && (
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 2,
            height: '15vh',
            width: '100%'
          }}>
          <Stack display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <TitleSkeleton />
          </Stack>
          <Stack display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={2}>
            <TitleSkeleton />
            <SpanSkeleton />
            <SpanSkeleton />
          </Stack>
          <Stack
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            sx={{ padding: { xs: 1, sm: 8 } }}>
            <SpanSkeleton />
          </Stack>
        </Stack>
      )}
      {isError && <SomethingWentWrong />}
      {data && (
        <List
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr'
          }}>
          <ListItem disablePadding alignItems="center">
            <Typography
              color={'textPrimary'}
              variant="h5"
              sx={{ fontWeight: 'bold', fontSize: { xs: '0.9em', sm: '1.8em' } }}>
              Delivery Address
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Typography
              variant="h6"
              color={'textPrimary'}
              fontWeight={'bold'}
              sx={{ fontSize: { xs: '0.9em', sm: '1.8em' } }}>
              {newDeliveryAddress?.name}
            </Typography>
            <Typography color={'textPrimary'}>{newDeliveryAddress?.street}</Typography>
            <Typography color={'textPrimary'}>{newDeliveryAddress?.unitNumber}</Typography>
            <Typography
              color={
                'textPrimary'
              }>{`${newDeliveryAddress?.city},${newDeliveryAddress?.zipCode}`}</Typography>
          </ListItem>
          <ListItem>
            <Button variant="text" color="info" onClick={toggle}>
              Change
            </Button>
          </ListItem>
        </List>
      )}
    </>
  )
}

export default DefaultAddress
