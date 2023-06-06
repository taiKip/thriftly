import { IOrder, IOrderResponse, IPage, IQuery } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'

export const extendedOrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IPage<IOrderResponse>, Partial<IQuery>>({
      query: ({ pageNo = 0, pageSize = 10, sortDir = 'ASC', sortBy = 'name' }) =>
        `/orders?pageSize=${pageSize}&pageNo=${pageNo}&sortDir=${sortDir}&sortBy=${sortBy}`,
      providesTags: ['Products']
    }),
    placeOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (order: IOrder) => ({
        url: '/orders',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const { useGetOrdersQuery, usePlaceOrderMutation } = extendedOrdersApiSlice
