import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import AddressForm from './AddressForm'

const AddNewAddress = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="new Address"
      aria-describedby="add new Address">
      <DialogActions>
        <IconButton aria-label="back" sx={{ marginRight: 'auto' }} onClick={handleClose}>
          <ArrowBack />
        </IconButton>
      </DialogActions>
      <DialogTitle variant="h4" sx={{ fontSize: { xs: '1.2em' } }} color={'text.primary'}>
        Enter a new delivery address
      </DialogTitle>
      <DialogContent>
        {/* return to same page  */}
        <AddressForm
          navigation="/orders"
          showDefaultOption={true}
          buttonText="use this address"
          successText="  Address added 🎉"
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddNewAddress
