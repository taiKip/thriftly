import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../features/api/apiSlice'
import CartReducer from '../features/cart/cartSlice'
import AuthReducer from '../features/auth/authSlice'
import PageInfoReducer from '../features/page/pageInfoSlice'
import OrderReducer from '../features/orders/orderSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: CartReducer,
    auth: AuthReducer,
    pageInfo: PageInfoReducer,
    order: OrderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
