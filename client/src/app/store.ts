import { apiSlice } from '../features/api/apiSlice'

import { configureStore } from '@reduxjs/toolkit'

import CartReducer from '../features/cart/cartSlice'
import AuthReducer from '../features/auth/authSlice'
import PageInfoReducer from '../features/page/pageInfoSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: CartReducer,
    auth: AuthReducer,
    pageInfo: PageInfoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
