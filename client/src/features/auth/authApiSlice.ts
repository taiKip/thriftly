import { logOut } from './authSlice'
import { IUser } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'

export const extendedAuthenticationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: Partial<IUser>) => ({
        url: '/auth/register',
        method: 'POST',
        body
      })
    }),
    loginUser: builder.mutation({
      query: (body: Partial<IUser>) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body
      })
    }),
    oauth2Login: builder.mutation({
      query: (body) => ({
        url: '/auth/oauth2',
        method: 'POST',
        body
      })
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logOut())
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useOauth2LoginMutation
} = extendedAuthenticationSlice
