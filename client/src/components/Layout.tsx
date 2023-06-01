import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Container } from '@mui/system'
import Header from './Header'
import FooterMenu from './FooterMenu'
import { Box, Toolbar } from '@mui/material'

import { wrapperStyle } from '../styles'
import EnhancedSelect from './EnhancedSelect'
import SearchBar from './SearchBar'
import useDebounce from '../utils/hooks/useDebounce'
import { sortType } from '../types'
import { sortItems } from '../utils/functions/extraValues'
import Categories from '../features/categories/Categories'

const Layout = () => {
  const [searchItem, setSearchItem] = useState<string>('')
  const [sort, setSort] = useState<sortType>('' as sortType)

  const debounceSearchValue = useDebounce(searchItem, 500)
  return (
    <Container sx={{ minHeight: '100vh', padding: { xs: 0 } }}>
      <Header />
      <Container sx={{ padding: { xs: 1, sm: 'none' } }}>
        <Outlet />
      </Container>
      <FooterMenu />
    </Container>
  )
}

export default Layout
