import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import AddressForm from './AddressForm'

const NewUserAddress = () => {
  return (
    <>
      <SmallScreenAppBar />
      <Container sx={{ padding: { xs: 2, sm: 6 }, overflow: 'scroll' }}>
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Add Address
        </Typography>
        <AddressForm
          navigation="/"
          showDefaultOption={false}
          buttonText="Save address"
          successText="Sign up successfull,welcome to thriftly 🎉"
        />
      </Container>
    </>
  )
}

export default NewUserAddress
