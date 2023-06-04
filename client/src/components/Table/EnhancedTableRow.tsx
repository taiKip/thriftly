import { useState } from 'react'
import { TableRow, TableCell, Box, Typography, Checkbox, useTheme, IconButton } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PendingActionsIcon from '@mui/icons-material/PendingActions'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import Avatar from '@mui/material/Avatar'

export interface tableRowProps {
  firstName: string
  lastName: string
  repairRequest: string
  complaintId: number
  severity: string
  status: 'fixed' | 'pending'
}
const EnhancedTableRow = ({
  firstName,
  lastName,
  repairRequest,
  complaintId,
  severity
}: tableRowProps) => {
  const theme = useTheme()
  const [orderStatus, setOrderStatus] = useState('')
  const handleChange = (event: SelectChangeEvent) => {
    setOrderStatus(event.target.value)
  }

  return (
    <TableRow sx={{ justifyContent: 'center', tableLayout: 'fixed' }}>
      <TableCell padding="checkbox">
        <Checkbox
          color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
          inputProps={{
            'aria-label': 'select all complaints'
          }}
        />
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2, whiteSpace: 'no-wrap' }}>
        {severity === 'Emergency' ? (
          <PendingActionsIcon color="warning" />
        ) : (
          <RequestQuoteIcon color="success" />
        )}
        <Box>
          <Typography variant="subtitle2" color="GrayText">
            {complaintId}
          </Typography>
          <Typography component={'h4'} fontWeight="bold">
            {repairRequest}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box display={'flex'} alignItems="center" gap={2}>
          <Avatar />
          {firstName + ' ' + lastName}
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
            value={orderStatus}
            label="Order Status"
            onChange={handleChange}
            color="secondary">
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
            <MenuItem value={'Shipped'}>Fullfilled</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>€207.85</TableCell>
    </TableRow>
  )
}

export default EnhancedTableRow
