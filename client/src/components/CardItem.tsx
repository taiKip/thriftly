import React from 'react'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ReportOutlined from '@mui/icons-material/ReportOutlined'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import BarChart from './BarChart'

export interface ICardProps {
  title: string
  icon: React.ReactElement<typeof ReportOutlined>
  color: string
  orders: string
  status: 'pending' | 'confirmed' | 'fullfilled'
}
const CardItem = ({ title, icon, color, orders }: ICardProps) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        sx={{ borderBottom: 1 }}
        avatar={icon}
        title={title}
        action={
          <IconButton>
            <ArrowForward />
          </IconButton>
        }
      />
      <CardContent>
        <Stack display={'flex'} flexDirection={'row'}>
          <Box flexGrow={3}>
            <Typography fontWeight="bold">21 Orders</Typography>
            <Typography color="InactiveCaptionText">
              <Box component="span" color={color}>
                {orders}
              </Box>{' '}
              from last month
            </Typography>
          </Box>
          <Box sx={{ width: '40%', height: '110px' }}>
            <BarChart
              label="Emergency"
              labels={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
              barData={[15, 13, 23, 15, 22, 16, 7]}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardItem
