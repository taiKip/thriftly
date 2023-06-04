import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'

import { useAppDispatch } from '../../app/hooks'
import { useRegisterUserMutation } from './authApiSlice'
import { EMAIL_REGEX, PWD_REGEX } from '../../utils/AppConstants'
import { setCredentials } from './authSlice'
import { inputFormStyle } from '../../styles'
import GoogleLoginButton from '../../components/GoogleLoginButton'
import { setPageInfo } from '../page/pageInfoSlice'
import ErrorAlert from '../../components/error/ErrorAlert'

const field = {
  marginTop: '20px',
  marginBottom: '20px',
  display: 'block'
}

const SignUp = () => {
  const navigate = useNavigate()
  const [registerUser, { isLoading, isSuccess, data }] = useRegisterUserMutation()
  const dispatch = useAppDispatch()

  /**
   * @desc Refs
   */

  const userNameRef = useRef<HTMLInputElement | null>()
  const emailRef = useRef<HTMLInputElement | null>()
  const pRef = useRef<HTMLInputElement | null>()
  const cPRef = useRef<HTMLInputElement | null>()

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (userNameRef != null) {
      userNameRef.current?.focus()
    }
  }, [userName])

  useEffect(() => {
    if (emailRef && emailRef.current?.focus()) {
      setEmailValid(EMAIL_REGEX.test(email))
    }
  }, [email])

  useEffect(() => {
    if (pRef && pRef.current?.focus()) {
      setPasswordValid(PWD_REGEX.test(password))
    }
  }, [password])

  useEffect(() => {
    if (cPRef && cPRef.current?.focus()) {
      setConfirmPasswordValid(PWD_REGEX.test(confirmPassword))
    }
  }, [confirmPassword])

  const canSave =
    [email, password, userName].every(Boolean) && confirmPassword === password && !isLoading

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (canSave) {
      await registerUser({
        email,
        name: userName,
        password
      })
        .unwrap()
        .then((payload) => {
          dispatch(setCredentials(payload))
          dispatch(setPageInfo({ name: 'Address details', description: 'Almost theres' }))
          setEmail('')
          setUserName('')
          setPassword('')
          setConfirmPassword('')
          navigate('/details')
        })
        .catch((err) => {
          if (err.status) {
            setError(`${err.data.httpStatus}::${err.data.message}`)
          }
        })
    } else {
      return
    }
  }

  return (
    <>
      <SmallScreenAppBar />
      <Container sx={inputFormStyle}>
        <Snackbar
          open={isSuccess}
          autoHideDuration={1500}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Sign up successfull 🎉
          </Alert>
        </Snackbar>
        <ErrorAlert error={error} />
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Sign up
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            sx={field}
            label="Email"
            color="secondary"
            fullWidth
            required
            error={emailValid}
            inputRef={emailRef}
          />
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            sx={field}
            label="Username"
            color="secondary"
            fullWidth
            required
            inputRef={userNameRef}
          />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            sx={field}
            label="Password"
            color="secondary"
            fullWidth
            required
            error={passwordValid}
          />
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={field}
            label="Confirm password"
            color="secondary"
            fullWidth
            required
            error={confirmPasswordValid}
          />
          <Stack display={'flex'}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}>
              Sign Up
            </Button>
            <Button color="secondary" onClick={() => navigate('/auth/login')}>
              already have an account? Login
            </Button>
          </Stack>
          <GoogleLoginButton />
        </form>
      </Container>
    </>
  )
}

export default SignUp
