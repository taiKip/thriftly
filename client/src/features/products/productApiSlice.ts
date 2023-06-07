import { IPage } from '../../interfaces'
import { IProduct, IReview } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'
import { IQuery } from '../../interfaces'
export const extendedProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IPage<IProduct>, Partial<IQuery>>({
      query: ({ categoryId = 0, pageNo = 0, pageSize = 5, sortDir = 'ASC', sortBy = 'name' }) =>
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
      query: ({ product, productId }: { product: Partial<IProduct>; productId: string }) => ({
        url: `products/${productId}`,
        method: 'PATCH',
        body: { ...product }
      }),
      invalidatesTags: ['Products']
    }),
    searchProductByName: builder.query<IProduct[], string>({
      query: (name: string) => ({
        url: `products/search?name=${name}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddReviewMutation,
  useSearchProductByNameQuery,
  useLazySearchProductByNameQuery
} = extendedProductsApiSlice
