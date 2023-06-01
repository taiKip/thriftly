import React from 'react'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import UserNotLoggeIn from './UserNotLoggedIn'
import UserLoggedIn from './UserLoggedIn'
import { useAppSelector } from '../../app/hooks'
import { selectCurrentUserToken } from '../auth/authSlice'

const UserProfilePage = () => {
  // const user = useAppSelector((state) => state.auth.user)
  const { accessToken } = useAppSelector(selectCurrentUserToken)

  return accessToken ? (
    <>
      <SmallScreenAppBar />
      <UserLoggedIn />
    </>
  ) : (
    <>
      <SmallScreenAppBar />
      <UserNotLoggeIn />
    </>
  )
}

export default UserProfilePage
