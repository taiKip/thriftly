/**
 * @packages
 */
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import PaidIcon from '@mui/icons-material/Paid'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Toolbar from '@mui/material/Toolbar'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Add from '@mui/icons-material/Add'
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined'
import Stack from '@mui/material/Stack'
import useTheme from '@mui/material/styles/useTheme'
/**
 * @components
 */
import CardItem, { ICardProps } from '../components/CardItem'
import BarChart from '../components/BarChart'
import EnhancedTable from '../features/orders/EnhancedTable'

const cardItems = [
  {
    color: '#43a047',
    icon: <PendingActionsIcon color="warning" />,
    title: 'Pending',
    status: 'emergency',
    orders: '+21%'
  },
  {
    color: 'purple',
    icon: <PaidIcon color="info" />,
    title: 'Confirmed',
    status: 'normal',
    orders: '-49%'
  },
  {
    color: '#43a047',
    icon: <CheckBoxOutlined color="success" />,
    title: 'Fullfilled',
    status: 'fullfilled',
    orders: '-7%'
  }
] as ICardProps[]
const labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const data = [15, 13, 23, 15, 22, 16, 7]

const Dashboard = () => {
  const theme = useTheme()

  return (
    <Box>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        <Stack direction="row" spacing={2} marginLeft={'auto'}>
          <Link to={'/dashboard/create'}>
            <Button
              variant={theme.palette.mode === 'dark' ? 'contained' : 'outlined'}
              startIcon={<Add />}
              color="inherit">
              New Product
            </Button>
          </Link>
        </Stack>
      </Box>
      <Box marginTop={3} display="flex" flexDirection={'column'}>
        <Stack>
          <Typography color={theme.palette.mode === 'dark' ? 'primary' : 'inherit'} variant="h4">
            Orders
          </Typography>
          <Typography variant="subtitle1" color="GrayText">
            View your newest orders
          </Typography>
        </Stack>
      </Box>
      <Box marginTop={2}>
        <Stack direction="row" spacing={3}>
          {cardItems.map((item) => (
            <CardItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              orders={item.orders}
              color={item.color}
              status={item.status}
            />
          ))}
        </Stack>
      </Box>
      <Stack marginTop={3} direction="row" spacing={3} marginBottom={3}>
        <Card sx={{ flex: 2 }}>
          <EnhancedTable />
        </Card>
        <Card sx={{ flex: 0.96, padding: 0 }}>
          <CardHeader title="Avg. Orders" subheader="Average store orders" />
          <CardContent sx={{ height: '70%' }}>
            <BarChart label="orders" labels={labels} barData={data} />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default Dashboard
