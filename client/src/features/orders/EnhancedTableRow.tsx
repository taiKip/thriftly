import { useState } from 'react'
import { TableRow, TableCell, Box, Typography, Checkbox, useTheme, IconButton } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined'
import PaidIcon from '@mui/icons-material/Paid'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import Avatar from '@mui/material/Avatar'
import moment from 'moment'

import { IOrderResponse } from '../../interfaces'
import { orderStatusType } from '../../types/index'
import { DATE_FORMAT } from '../../utils/AppConstants'

export interface tableRowProps {
  firstName: string
  lastName: string
  repairRequest: string
  complaintId: number
  severity: string
  status: 'fixed' | 'pending'
}
const EnhancedTableRow = ({
  address,
  createdAt,
  orderId,
  orderItems,
  orderStatus,
  total
}: IOrderResponse) => {
  const theme = useTheme()
  const [status, setStatus] = useState<orderStatusType>(orderStatus)
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as orderStatusType)
  }
  let icon = <PendingActionsIcon color="warning" />
  if (orderStatus === 'FULFILLED') {
    icon = <CheckBoxOutlined color="success" />
  } else if (orderStatus === 'CONFIRMED') {
    icon = <PaidIcon color="info" />
  }
  return (
    <TableRow
      sx={{
        justifyContent: 'center',
        '&:nth-of-type(odd)': { background: theme.palette.action.hover }
      }}>
      <TableCell padding="checkbox">
        <Checkbox
          color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
          inputProps={{
            'aria-label': 'select all complaints'
          }}
        />
      </TableCell>
      <TableCell sx={{ alignItems: 'center', display: 'grid', whiteSpace: 'nowrap' }}>
        {icon}
        <Box>
          <Typography variant="subtitle2" color="GrayText">
            id:
            {orderId}
          </Typography>
          <Typography component={'h4'} fontWeight="bold">
            {`${moment(createdAt).format(DATE_FORMAT)}`}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box display={'flex'} alignItems="center" gap={2}>
          <Avatar />
          {address.name}
        </Box>
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <InputLabel id="status-select" color="secondary">
            Order Status
          </InputLabel>
          <Select
            labelId="status-select"
            id="status-select"
            value={status}
            label="Order Status"
            onChange={handleChange}
            color="secondary">
            <MenuItem value={'PENDING'}>Pending</MenuItem>
            <MenuItem value={'CONFIRMED'}>Confirmed</MenuItem>
            <MenuItem value={'FULLFILLED'}>Fullfilled</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>€{total.toFixed(2)}</TableCell>
    </TableRow>
  )
}

export default EnhancedTableRow
