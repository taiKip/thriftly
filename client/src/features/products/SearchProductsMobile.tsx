import { useState } from 'react'

import { Toolbar } from '@mui/material'

import SearchBar from '../../components/SearchBar'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
const SearchProductsMobilePage = () => {
  const [searchHistoryArray, setSearchHistoryArray] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <>
      <SmallScreenAppBar />
      <Toolbar />
      <SearchBar handleSearch={setSearchValue} searchValue={searchValue} />
    </>
  )
}

export default SearchProductsMobilePage
