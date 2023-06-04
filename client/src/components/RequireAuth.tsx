import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentUserToken } from '../features/auth/authSlice'
import { useAppSelector } from '../app/hooks'
import useAuth from '../utils/hooks/useAuth'

const RequireAuth = () => {
  const location = useLocation()
  const { isAdmin, isManager, isUser } = useAuth()

  return isAdmin || isManager || isUser ? (
    <Outlet />
  ) : (
    <Navigate to={'/auth/register'} state={{ from: location }} replace />
  )
}

export default RequireAuth
