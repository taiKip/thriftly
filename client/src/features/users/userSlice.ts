import { IPage, IQuery, IUser } from '../../interfaces'
import { apiSlice } from './../api/apiSlice'

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IPage<IUser>, IQuery>({
      query: ({ pageNo, pageSize }) => `/users?pageNo=${pageNo}&pageSize=${pageSize}`,
      providesTags: ['Users']
    })
  })
})

export const { useGetUsersQuery } = extendedUsersApiSlice
