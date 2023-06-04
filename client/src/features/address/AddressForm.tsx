import { useNavigate } from 'react-router-dom'
import { FormEvent, useState, useEffect } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'

import { fieldStyle } from '../../styles'
import { useAddNewAddressMutationMutation } from './addressSlice'

const AddressForm = ({
  navigation,
  showDefaultOption,
  successText,
  buttonText,
  handleClose
}: {
  navigation: string
  showDefaultOption: boolean
  successText: string
  buttonText: string
  handleClose?: () => void
}) => {
  const navigate = useNavigate()
  const [addNewAddress, { isSuccess, data }] = useAddNewAddressMutationMutation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [unit, setUnit] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipCode] = useState('')
  const [isDefault, setIsDefault] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess && data) {
        navigate(navigation, { replace: true })
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [isSuccess, data])
  const canSave = [name, phone, unit, street, city, zipcode, isDefault].every(Boolean)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const address = { name, phone, unit, street, city, zipcode, isDefault }
    console.log(address)
    if (canSave) {
      await addNewAddress(address)
        .unwrap()
        .then((payload) => {
          console.log(payload)
          setName('')
          setPhone('')
          setUnit('')
          setStreet('')
          setZipCode('')
          setIsDefault(true)
          handleClose && handleClose()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      return
    }
  }
  return (
    <>
      <Snackbar
        open={isSuccess}
        autoHideDuration={1500}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {successText}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          sx={fieldStyle}
          label="Full name"
          color="secondary"
          fullWidth
          required
        />

        <TextField
          onChange={(e) => setPhone(e.target.value)}
          sx={fieldStyle}
          label="Phone number"
          color="secondary"
          fullWidth
          required
          type="tel"
        />
        <TextField
          onChange={(e) => setStreet(e.target.value)}
          sx={fieldStyle}
          label="Street name"
          placeholder="Ratapihankatu 38"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => setUnit(e.target.value)}
          sx={fieldStyle}
          label="Unit"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => setZipCode(e.target.value)}
          sx={fieldStyle}
          label="ZipCode"
          color="secondary"
          placeholder="20100"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => setCity(e.target.value)}
          sx={fieldStyle}
          label="Town/City"
          color="secondary"
          placeholder="Turku"
          fullWidth
          required
        />
        {showDefaultOption && (
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={isDefault}
                onChange={() => setIsDefault((prev) => !prev)}
              />
            }
            label={<Typography color="textPrimary">Make this your default address</Typography>}
          />
        )}
        <Button variant="contained" color="warning" type="submit">
          {buttonText}
        </Button>
      </form>
    </>
  )
}

export default AddressForm
