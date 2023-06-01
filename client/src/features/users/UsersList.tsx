import { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { extendedUsersApiSlice, useGetUsersQuery } from './userSlice'

const UsersList = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(extendedUsersApiSlice.endpoints.getUsers.initiate())
  }, [])

  const { data } = useGetUsersQuery()
  return <div>UsersList</div>
}

export default UsersList
