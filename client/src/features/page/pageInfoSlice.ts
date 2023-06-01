import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPageTitle } from '../../interfaces'
import { RootState } from '../../app/store'
const initialState: IPageTitle = {
  name: 'All',
  description: 'All products'
}
const pageInfoSlice = createSlice({
  name: 'pageTitle',
  initialState,
  reducers: {
    setPageInfo: (state, action: PayloadAction<typeof initialState>) => {
      state.name = action.payload.name
      state.description = action.payload.description
    }
  }
})

export const { setPageInfo } = pageInfoSlice.actions
export const seletCurrentCategory = (state: RootState) => state.pageInfo
export default pageInfoSlice.reducer
