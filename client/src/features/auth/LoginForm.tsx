import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Snackbar, Stack, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { LoginOutlined } from '@mui/icons-material'
import { useLoginUserMutation } from './authApiSlice'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { useAppDispatch } from '../../app/hooks'
import { setCredentials } from './authSlice'
import { EMAIL_REGEX, PWD_REGEX } from '../../utils/AppConstants'
import { buttonStackStyle, fieldStyle, inputFormStyle } from '../../styles'
import GoogleLoginButton from '../../components/GoogleLoginButton'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef<HTMLInputElement | null>()
  const passwordRef = useRef<HTMLInputElement | null>()

  const [error, setError] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [loginUser, { data, isSuccess }] = useLoginUserMutation()
  useEffect(() => {
    if (emailRef != null) {
      emailRef.current?.focus()
    }
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess && data) {
        navigate('/', { replace: true })
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [isSuccess, data])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError(false)
    setPasswordError(false)
    if (email === '' && !EMAIL_REGEX.test(email)) {
      setEmailError(true)
    }
    if (password === '' && !PWD_REGEX.test(password)) {
      setPasswordError(true)
    }

    if (email && password) {
      await loginUser({ email, password })
        .unwrap()
        .then((payload) => {
          dispatch(setCredentials({ ...payload }))

          setEmail('')
          setPassword('')
        })
        .catch((err) => {
          if (err.status === 400) {
            setError(`Bad request::check user details`)
          }
          if (err.status === 401) {
            setError('Unauthorized')
          }
          if (err.status?.data) {
            setError(`${err.data.httpStatus}::${err.data.message}`)
          }
        })
    }
  }
  return (
    <>
      <SmallScreenAppBar />

      <Container sx={inputFormStyle}>
        <Toolbar />
        <Snackbar
          open={isSuccess}
          autoHideDuration={1000}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Login successfull 🎉
          </Alert>
        </Snackbar>
        {Boolean(error) && (
          <Alert severity="error" aria-live="assertive">
            {error}
          </Alert>
        )}
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            sx={fieldStyle}
            label="Email"
            color="secondary"
            fullWidth
            required
            error={emailError}
            inputRef={emailRef}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            sx={fieldStyle}
            label="Password"
            color="secondary"
            fullWidth
            required
            error={passwordError}
            inputRef={passwordRef}
          />
          <Stack sx={buttonStackStyle}>
            <Button type="submit" color="secondary" variant="contained" endIcon={<LoginOutlined />}>
              Log In
            </Button>
            <GoogleLoginButton />
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default Login
