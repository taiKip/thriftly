import { useGoogleLogin } from 'react-google-login'
import { Container, Fab, Skeleton, Stack, Typography, Box } from '@mui/material'
import shopper from '../../assets/shopping.svg'
import LoginButton from '../../components/LoginButton'
import SignUpButton from '../../components/SignUpButton'
import GoogleLoginButton from '../../components/GoogleLoginButton'
import { useContext, useState } from 'react'
import { DarkModeOutlined } from '@mui/icons-material'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import { useTheme } from '@mui/material/styles'
import UseTheme from '../../utils/hooks/UseTheme'
import { ThemeContext } from '../../App'
import { buttonStackStyle } from '../../styles'

const UserNotLoggedIn = () => {
  const theme = useTheme()

  const { toggleColorMode } = useContext(ThemeContext)
  const [loading, setLoading] = useState(true)

  return (
    <Container sx={{ paddingTop: 10, overflow: 'hidden', display: { sm: 'none' } }}>
      <Fab
        sx={{ top: '30vh', left: '80vw', position: 'fixed' }}
        size="small"
        color="primary"
        onClick={toggleColorMode}>
        {theme.palette.mode === 'light' ? <DarkModeOutlined /> : <Brightness5Icon />}
      </Fab>
      <>
        {!loading ? (
          <Typography
            color={
              theme.palette.mode === 'dark'
                ? theme.palette.primary.main
                : theme.palette.secondary.main
            }
            variant="h1"
            fontSize={'1.5em'}
            display={'flex'}
            fontWeight={900}
            alignItems={'center'}
            gap={3}>
            Let&#39;s get you started 😊
          </Typography>
        ) : (
          <Skeleton
            variant="rectangular"
            height={'30px'}
            sx={{ borderRadius: 1 }}
            animation="wave"
          />
        )}
      </>
      <div
        style={{
          marginTop: '24px'
        }}>
        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: 1 }}
            height={'35vh'}
            animation="wave"
          />
        )}
        <img
          onLoad={() => setLoading(false)}
          src={shopper}
          loading="lazy"
          style={{
            objectFit: 'contain',
            maxHeight: '35vh',
            animation: 'fade-in'
          }}
        />
      </div>

      <Stack sx={buttonStackStyle} marginTop={6} marginBottom={6}>
        {!loading && (
          <>
            <LoginButton />
            <SignUpButton />
            <GoogleLoginButton />
          </>
        )}
        {loading &&
          [1, 2, 3].map((item) => (
            <Skeleton
              variant="rectangular"
              animation="wave"
              key={item}
              height={'28px'}
              sx={{ borderRadius: 1 }}
              width={'100%'}
            />
          ))}
      </Stack>
    </Container>
  )
}

export default UserNotLoggedIn
