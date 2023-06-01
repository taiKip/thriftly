import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@mui/material'
import GoogleIcon from '../assets/google.svg'

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code'
  })
  return (
    <Button
      variant="contained"
      sx={{ display: 'flex', gap: 1 }}
      color="info"
      onClick={() => login()}>
      <img src={GoogleIcon} height="16px" />
      Continue with google
    </Button>
  )
}

export default GoogleLoginButton
