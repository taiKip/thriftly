import { Card, CardMedia, Container, Stack, Button } from '@mui/material'
import Profile from '../../assets/profile.jpeg'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../app/hooks'

const UserLoggedIn = () => {
  // const user = useAppSelector((state) => state.auth.user)

  return (
    <Container
      sx={{
        paddingTop: 10,
        overflow: 'hidden',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2
      }}>
      <Card
        sx={{
          minWidth: 300
        }}>
        <CardMedia image={Profile} sx={{ height: 250 }} />
      </Card>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        gap={2}
        width={'100%'}
        justifyContent={'center'}>
        <Button variant="contained" sx={{ width: '100%', maxWidth: 200 }}>
          history
        </Button>
        <Button variant="contained" sx={{ width: '100%', maxWidth: 200 }}>
          Update Profile
        </Button>
      </Stack>
    </Container>
  )
}

export default UserLoggedIn
