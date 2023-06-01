import { IOrder } from '../../interfaces'
import { apiSlice } from './../api/apiSlice'

export const extendedOrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => '/orders',
      providesTags: ['Orders']
    }),
    placeOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (order: IOrder) => ({
        url: '/orders',
        method: 'POST',
        body: JSON.stringify(order)
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const { useGetOrdersQuery, usePlaceOrderMutation } = extendedOrdersApiSlice
