import { apiSlice } from './../api/apiSlice'

export type userType = {
  id: number
  firstname: string
  lastname: string
  email: string
  isAdmin: boolean
  isLoggedIn: boolean
  isBanned: boolean
  image: string
  products: number[]
}
export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<userType[], void>({
      query: () => '/users',
      providesTags: ['Users']
    })
  })
})

export const { useGetUsersQuery } = extendedUsersApiSlice
