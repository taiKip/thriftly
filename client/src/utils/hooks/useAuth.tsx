import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectCurrentUserToken } from '../../features/auth/authSlice'
import jwtDecode from 'jwt-decode'
interface IToken {
  role: string
  name: string
  isBanned: boolean
  exp: number
}
const useAuth = () => {
  const { accessToken } = useAppSelector(selectCurrentUserToken)
  let isAdmin = false
  let isUser = false
  let isManager = false

  if (accessToken) {
    const decoded = jwtDecode<IToken>(accessToken)
    const { isBanned, name, role, exp } = decoded
    switch (role) {
      case 'ADMIN':
        isAdmin = true
        break
      case 'USER':
        isUser = true
        break
      case 'MANAGER':
        isManager = true
        break
    }
    return { isAdmin, isManager, isBanned, isUser, name, exp }
  }
  return { username: '', isAdmin, isUser, isManager }
}

export default useAuth
