import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { SelectChangeEvent } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useGetUsersQuery, useUpdateUserMutation } from './userSlice'

const UserProfile = ({
  userId,
  handleClose
}: {
  userId: number | null
  handleClose: () => void
}) => {
  const [userRole, setUserRole] = useState('')
  const [
    updateUser,
    { data: updateResponse, isLoading: updatingUser, isSuccess, error: updateError }
  ] = useUpdateUserMutation()
  const { user, isLoading, error } = useGetUsersQuery(
    {},
    {
      selectFromResult: ({ data, isLoading, error }) => ({
        user: data?.items?.find((item) => item.id === userId),
        isLoading,
        error
      })
    }
  )
  const [ban, setBan] = useState(user?.banned)
  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value)
  }
  const handleConfirm = async () => {
    const update = { role: userRole, banned: ban, id: user?.id }
    if (!isLoading) {
      try {
        await updateUser(update)
      } catch (err) {
        console.error(err)
      }
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateResponse && isSuccess) {
        handleClose()
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [updateResponse, isSuccess])
  return (
    <>
      <Snackbar
        open={isSuccess}
        autoHideDuration={1000}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          <> {isSuccess && updateResponse?.response + ' '}😎</>
        </Alert>
      </Snackbar>
      <Card sx={{ textAlign: 'center' }}>
        {updateError && <Alert>{'Something went wrong '} 🫠</Alert>}
        <CardHeader
          title={user?.name}
          subheader={
            <Box>
              <Typography>{user && user.email} </Typography>
              <Typography>Current Role:&nbsp; {user?.role}</Typography>
            </Box>
          }
        />
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
          <Box component="div" display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography color={'textPrimary'}>Assign new Role:&nbsp; &nbsp;</Typography>

            <Select
              color="secondary"
              sx={{ width: '200px', borderColor: '#FEFEFE' }}
              value={userRole}
              onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem color={'textPrimary'} value={'ADMIN'}>
                ADMIN
              </MenuItem>
              <MenuItem value={'MANAGER'}>MANAGER</MenuItem>
              <MenuItem value={'USER'}>USER</MenuItem>
            </Select>
          </Box>
          <Box
            gap={2}
            marginTop={2}
            marginLeft={'auto'}
            display="flex"
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Button
              variant="contained"
              color={ban ? 'success' : 'error'}
              sx={{ width: '200px' }}
              onClick={() => setBan((prev) => !prev)}>
              {ban ? <>Unban user</> : <>Ban user</>}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '200px' }}
              onClick={handleConfirm}>
              Confirm Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default UserProfile
