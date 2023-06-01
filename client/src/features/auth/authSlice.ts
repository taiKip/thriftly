import { IAuthState } from '../../interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'

const initialAuthState: IAuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken')
}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthState>) => {
      const { accessToken, refreshToken } = action.payload
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken))

      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    logOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUserToken = (state: RootState) => state.auth
