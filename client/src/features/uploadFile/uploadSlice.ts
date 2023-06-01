import { IFile } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'

export const extendFileUploadSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<IFile, FormData>({
      query: (file) => ({
        url: '/files',
        method: 'POST',
        credentials: 'include',
        body: file
      })
    })
  })
})

export const { useUploadImageMutation } = extendFileUploadSlice
