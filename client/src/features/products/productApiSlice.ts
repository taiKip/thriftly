import { IPage } from '../../interfaces'
import { IProduct, IReview } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'
import { sortDirectionType } from '../types'
export interface IQuery {
  categoryId?: number
  pageNo?: number
  pageSize?: number
  sortDir?: sortDirectionType
  sortBy?: string
}
export const extendedProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IPage<IProduct>, IQuery>({
      query: ({ categoryId = 1, pageNo = 0, pageSize = 10, sortDir = 'ASC', sortBy = 'name' }) =>
        `/products?categoryId=${categoryId}&pageSize=${pageSize}&pageNo=${pageNo}&sortDir=${sortDir}&sortBy=${sortBy}`,
      providesTags: ['Products']
    }),
    addNewProduct: builder.mutation({
      query: (product: Partial<IProduct>) => ({
        url: '/products',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Products']
    }),
    addReview: builder.mutation({
      query: ({ review, productId }: { review: Partial<IReview>; productId: number }) => ({
        url: `/products/${productId}/reviews`,
        method: 'POST',
        body: { ...review }
      }),
      invalidatesTags: ['Products']
    }),
    deleteProduct: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `products/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation({
      query: (product: Partial<IProduct>) => ({
        url: `products/${product.id}`,
        method: 'PUT',
        body: { data: product }
      }),
      invalidatesTags: ['Products']
    })
  })
})

export const {
  useGetProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddReviewMutation
} = extendedProductsApiSlice
