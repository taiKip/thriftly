import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import PaidIcon from '@mui/icons-material/Paid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { useState } from 'react'

import { Button, CardHeader, Toolbar, Typography, useTheme, Card, CardContent } from '@mui/material'
import {
  Add,
  CheckBoxOutlined,
  ConstructionOutlined,
  Help,
  ReportOutlined,
  Upload
} from '@mui/icons-material'
import { Stack } from '@mui/system'
import CardItem, { ICardProps } from '../components/CardItem'
import BarChart from '../components/BarChart'
import EnhancedTable from '../components/Table/EnhancedTable'
import { Link } from 'react-router-dom'

const cardItems = [
  {
    color: '#43a047',
    icon: <PendingActionsIcon color="warning" />,
    title: 'Pending',
    status: 'emergency',
    works: '+21%'
  },
  {
    color: 'purple',
    icon: <PaidIcon color="info" />,
    title: 'Confirmed',
    status: 'normal',
    works: '-49%'
  },
  {
    color: '#43a047',
    icon: <CheckBoxOutlined color="success" />,
    title: 'Fullfilled',
    status: 'fullfilled',
    works: '-7%'
  }
] as ICardProps[]
const labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const data = [15, 13, 23, 15, 22, 16, 7]

const Dashboard = () => {
  const [severity, setSeverity] = useState('')
  const handleChange = (event: SelectChangeEvent) => {
    setSeverity(event.target.value)
  }

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
          <Button variant="contained" startIcon={<Add />} color="inherit">
            New Category
          </Button>
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
              works={item.works}
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
