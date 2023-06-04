import { IReview } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'

export const extendReviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsById: builder.query<IReview[], number>({
      query: (id: number) => ({
        url: `/reviews/products/${id}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetReviewsByIdQuery } = extendReviewApiSlice
export const { useLazyGetReviewsByIdQuery } = extendReviewApiSlice
