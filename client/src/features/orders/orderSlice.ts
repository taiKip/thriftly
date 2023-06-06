import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IOrder, ICartItem } from '../../interfaces'
import { RootState } from '../../app/store'

const initialOrderState: IOrder = {
  orderItems: [],
  addressId: null
}
const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    addOrderAddress: (state, action: PayloadAction<Partial<IOrder>>) => {
      const addressId = action.payload.addressId as number
      state.addressId = addressId
    },
    addOrderItems: (state, action: PayloadAction<Partial<IOrder>>) => {
      const orderItems = action.payload.orderItems as ICartItem[]
      state.orderItems = orderItems
    },
    resetOrderItems: (state) => {
      state = initialOrderState
      return state
    }
  }
})

export const { addOrderAddress, addOrderItems, resetOrderItems } = orderSlice.actions
export const selectOrderAddress = (state: RootState) => state.order.addressId
export const selectOrderDetails = (state: RootState) => state.order
export default orderSlice.reducer
