import { IAddress } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'
export const extendedAddressSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddressesByUserId: builder.query<IAddress[], void>({
      query: () => ({
        url: `/addresses`,
        method: 'GET',
        providesTags: ['Address']
      })
    }),
    getDefaultUserAddress: builder.query<IAddress, void>({
      query: () => ({
        url: `/addresses/default`,
        method: 'GET',
        providesTags: ['Address']
      })
    }),
    addNewAddressMutation: builder.mutation({
      query: (address: Partial<IAddress>) => ({
        url: '/addresses',
        body: address,
        method: 'POST'
      }),
      invalidatesTags: ['Address']
    })
  })
})

export const {
  useGetAddressesByUserIdQuery,
  useAddNewAddressMutationMutation,
  useGetDefaultUserAddressQuery
} = extendedAddressSlice
