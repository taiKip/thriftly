import { fetchBaseQuery, createApi, BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { RootState } from '../../app/store'
import { logOut, setCredentials } from '../auth/authSlice'
import { IAuthState } from '../../interfaces/index'
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
      headers.append('Origin', 'Acess-Control-Allow-Origin')
    }
    return headers
  }
})

const refreshQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { refreshToken } = (getState() as RootState).auth

    if (refreshToken) {
      headers.set('Authorization', `Bearer ${refreshToken}`)
      headers.append('Origin', 'Acess-Control-Allow-Origin')
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if ((result.error && result.error.status === 401) || result.error?.status === 403) {
    // try to get a new token
    const refreshResult = await refreshQuery('/auth/refresh', api, extraOptions)
    if (refreshResult.data) {
      const newResult = refreshResult.data as IAuthState

      api.dispatch(setCredentials(newResult))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Users', 'Orders', 'Categories', 'Files'],
  endpoints: (builder) => ({})
})
