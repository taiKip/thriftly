import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const user = true //useAppSelector(selectCurrentUser)

  return user ? <Outlet /> : <Navigate to={'/'} replace />
}

export default RequireAuth
