import React, { useState } from 'react'

import { FormControl } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ISelectProps } from '../interfaces'
import { sortType } from '../types'

const EnhancedSelect = ({
  items,
  handleChange
}: {
  items: ISelectProps[]
  handleChange: (sort: sortType) => void
  value: string
}) => {
  const [selectBy, setSelectBy] = useState('')
  const handleItemChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    setSelectBy(event.target.value)
    handleChange(event.target.value as sortType)
  }
  return (
    <FormControl
      sx={{ m: 1, minWidth: 200, width: { xs: '100%', sm: '' }, padding: 0 }}
      size="small">
      <InputLabel id="demo-select-small" color="secondary">
        Sort by
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectBy}
        label="sort by"
        color="secondary"
        onChange={handleItemChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.content}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default EnhancedSelect
