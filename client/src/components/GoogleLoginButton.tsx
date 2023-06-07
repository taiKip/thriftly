import { useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@mui/material'
import GoogleIcon from '../assets/google.svg'
import { IGoogleUser } from '../interfaces'
import { useOauth2LoginMutation } from '../features/auth/authApiSlice'
import { useAppDispatch } from '../app/hooks'
import { setCredentials } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const GoogleLoginButton = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [oAuthLogin, { data, isError, isSuccess }] = useOauth2LoginMutation()
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => oAuthHandler(codeResponse as IGoogleUser),
    onError: (error) => console.error(error)
  })
  const oAuthHandler = async (response: IGoogleUser) => {
    await oAuthLogin(response)
      .unwrap()
      .then((payload) => {
        dispatch(setCredentials(payload))
        navigate('/')
      })
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
