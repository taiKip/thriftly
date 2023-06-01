import { RootState } from '../../app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct, IQuantity } from '../../interfaces'

export type cartItemType = IProduct & IQuantity

export type cartStateType = {
  cartItems: cartItemType[]
}
const initialState: cartStateType = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') ?? '[]')
    : []
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemType>) => {
      const itemInCart = state.cartItems.find((item) => item.id === action.payload.id)
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload)
      item && item.quantity++
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload)
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1
        } else {
          item.quantity--
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter((item) => item.id !== action.payload)
      state.cartItems = removeItem
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    resetCart: (state) => {
      state.cartItems = []
      console.log('reset cart')
      localStorage.removeItem('cartItems')
    }
  }
})
export const { addToCart, incrementQuantity, decrementQuantity, removeItem, resetCart } =
  cartSlice.actions
export const selectAllOrders = (state: RootState) => state.cart.cartItems
export default cartSlice.reducer
