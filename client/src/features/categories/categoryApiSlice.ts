import { ICategory } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'

export const extendedCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => '/categories',
      providesTags: ['Categories']
    }),
    addNewCategory: builder.mutation({
      query: (category: ICategory) => ({
        url: '/categories',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      })
    }),
    fetchCategoryById: builder.query<ICategory, number>({
      query: (categoryId: number) => ({
        url: `categories/${categoryId}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetCategoriesQuery, useFetchCategoryByIdQuery, useAddNewCategoryMutation } =
  extendedCategoriesApiSlice
