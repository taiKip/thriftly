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
  const [period, setPeriod] = useState('')

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
        <FormControl fullWidth>
          <InputLabel id="period" color="secondary">
            Period
          </InputLabel>
          <Select
            labelId="period-select"
            id="period-select"
            value={period}
            label="Period"
            onChange={(e) => setPeriod(e.target.value)}
            color="secondary">
            <MenuItem value={'Normal'}>Monthly</MenuItem>
            <MenuItem value={'Emergency'}>Weekly</MenuItem>
            <MenuItem value={'Emergency'}>Daily</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">Confirm Status</Button>
      </Stack>
    </Box>
  )
}

export default EnhancedTableHead
