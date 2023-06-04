import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { useState } from 'react'
const EnhancedTableHead = () => {
  const [city, setCity] = useState('')
  const [sortBy, setSortBy] = useState('')

  return (
    <Box
      display={'flex'}
      flexDirection="row"
      alignItems={'center'}
      padding={2}
      justifyContent={'space-between'}>
      <Stack>
        <CardHeader title="Orders" subheader=" Several works that need to be done" />
      </Stack>

      <Stack direction="row" spacing={2} minWidth={250}>
        <FormControl fullWidth sx={{ minWidth: '150px' }}>
          <InputLabel id="order-select" color="secondary">
            SortBy
          </InputLabel>
          <Select
            labelId="order-select"
            id="order-select"
            value={sortBy}
            label="SortBy"
            onChange={(e) => setSortBy(e.target.value)}
            color="secondary">
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
            <MenuItem value={'Fullfilled'}>Fullfilled</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">Confirm Selected changes</Button>
      </Stack>
    </Box>
  )
}

export default EnhancedTableHead
