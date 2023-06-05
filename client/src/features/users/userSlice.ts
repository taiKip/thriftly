import { IPage, IQuery, IUser, IResponse } from '../../interfaces'
import { apiSlice } from './../api/apiSlice'

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IPage<IUser>, IQuery | unknown>({
      query: ({ pageNo = 0, pageSize = 10 }) => `/users?pageNo=${pageNo}&pageSize=${pageSize}`,
      providesTags: ['Users']
    }),
    updateUser: builder.mutation<IResponse, Partial<IUser>>({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: rest
      })
    })
  })
})

export const { useGetUsersQuery, useUpdateUserMutation } = extendedUsersApiSlice
