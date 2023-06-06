import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@mui/material'
import GoogleIcon from '../assets/google.svg'
import { IGoogleUser } from '../interfaces'
import { useOauth2LoginMutation } from '../features/auth/authApiSlice'

const GoogleLoginButton = () => {
  const [oAuthLogin, { data, isError, isSuccess }] = useOauth2LoginMutation()
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => oAuthHandler(codeResponse as Partial<IGoogleUser>),
    flow: 'auth-code',
    onError: (error) => console.error(error)
  })
  const oAuthHandler = async (response: Partial<IGoogleUser>) => {
    console.log('Response::', response)
    await oAuthLogin(response)
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((err) => console.log(err))
  }
  return (
    <Button
      variant="contained"
      sx={{ display: 'flex', gap: 1 }}
      color="info"
      fullWidth
      onClick={() => login()}>
      <img src={GoogleIcon} height="16px" />
      Continue with google
    </Button>
  )
}

export default GoogleLoginButton
