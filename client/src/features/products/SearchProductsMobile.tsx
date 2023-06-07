import { useEffect, useState } from 'react'

import { Toolbar } from '@mui/material'

import SearchBar from '../../components/SearchBar'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import Wrapper from '../../components/wrapper/Wrapper'
import SearchList from './SearchList'
import useDebounce from '../../utils/hooks/useDebounce'
import { useLazySearchProductByNameQuery } from './productApiSlice'
const SearchProductsMobilePage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearchValue = useDebounce(searchValue, 600)
  const [searchProducts, { isFetching, data = [], isError, isSuccess }] =
    useLazySearchProductByNameQuery()
  useEffect(() => {
    if (debounceSearchValue.trim() !== '') {
      searchProducts(debounceSearchValue)
    }
  }, [debounceSearchValue])

  return (
    <>
      <SmallScreenAppBar />
      <Toolbar />
      <SearchBar handleSearch={setSearchValue} searchValue={searchValue} />
      <SearchList products={data} />
    </>
  )
}

export default SearchProductsMobilePage
