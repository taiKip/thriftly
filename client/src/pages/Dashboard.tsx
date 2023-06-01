import { useEffect } from 'react'
import { Add } from '@mui/icons-material'
import { Button, Card, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

import EnhancedTable from '../components/Table/EnhancedTable'

import { extendedOrdersApiSlice, useGetOrdersQuery } from '../features/orders/orderSlice'
import { useAppDispatch } from '../app/hooks'

const headerCells = ['#', 'Date', 'Status', 'Customer', 'Revenue']
const Dashboard = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(extendedOrdersApiSlice.endpoints.getOrders.initiate())
  }, [dispatch])

  const { data: orders } = useGetOrdersQuery()

  return (
    <Stack spacing={2} paddingTop={3}>
      <Link to="/dashboard/create" style={{ marginLeft: 'auto' }}>
        <Button variant="contained" color="inherit" startIcon={<Add />}>
          Add New product
        </Button>
      </Link>

      <Card>
        <EnhancedTable
          title={'Orders'}
          subheader={'Orders that need to be fullfilled'}
          headerCells={headerCells}
          orders={orders ?? []}
        />
      </Card>
    </Stack>
  )
}

export default Dashboard
