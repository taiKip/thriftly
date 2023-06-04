import { ChangeEvent, FormEvent, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import AddIcon from '@mui/icons-material/Add'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBack from '@mui/icons-material/ArrowBack'

import AddNewAddress from './AddNewAddress'
import { IconButton, Typography } from '@mui/material'
import { useGetAddressesByUserIdQuery } from './addressSlice'
import { useAppDispatch } from '../../app/hooks'
import { addOrderAddress } from '../orders/orderSlice'

const AddressList = ({ toggle }: { toggle: () => void }) => {
  const dispatch = useAppDispatch()

  const { data, isError, isLoading } = useGetAddressesByUserIdQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  let defaultAddress = null
  if (data) {
    defaultAddress = data.find((item) => item.isDefault === true)
  }

  const [addressId, setAddressId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressId(e.target.value)
  }
  /***
   *@desc add selected addrss to  local state
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const address = +addressId!
    console.log(address)
    dispatch(addOrderAddress({ addressId: address }))
  }

  const openForm = () => {
    setOpen((prev) => !prev)
    console.log('Closing form')
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        overflow: 'hidden'
      }}>
      <FormControl
        sx={{ m: 3, width: '100%', alignItems: 'start', paddingLeft: 0 }}
        variant="standard">
        <FormLabel id="select-address">
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={2}>
            <IconButton onClick={() => toggle()}>
              <ArrowBack />
            </IconButton>
            <Typography color="text.primary"> Your addresses</Typography>
          </Box>
        </FormLabel>
        <RadioGroup
          aria-labelledby="select-address"
          name="address"
          value={addressId}
          onChange={handleAddressChange}>
          {data &&
            data.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio color="secondary" />}
                label={
                  <Typography
                    color={
                      'text.primary'
                    }>{`${item.street},${item.unitNumber},${item.city},${item.zipCode},Phone number : ${item.phone}`}</Typography>
                }
                color="text.primary"
                sx={{
                  border: '1px solid gray',
                  borderRadius: '6px',
                  marginBottom: 1,
                  width: { xs: '90%', sm: '100%' },
                  overflow: 'hidden'
                }}
              />
            ))}
        </RadioGroup>
        <AddNewAddress open={open} handleClose={openForm} />
        <Button
          variant="text"
          startIcon={<AddIcon />}
          color="info"
          sx={{ fontWeight: 'bold' }}
          onClick={openForm}>
          Add a new address
        </Button>
        <Button
          sx={{ mt: 1, mr: 1 }}
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!addressId}>
          User this address
        </Button>
      </FormControl>
    </form>
  )
}

export default AddressList
