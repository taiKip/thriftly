import { Box, Toolbar, Skeleton } from '@mui/material'
import Product from './Product'
import { useGetProductsQuery } from './productApiSlice'
import { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { wrapperStyle } from '../../styles'
import { SelectChangeEvent } from '@mui/material'

import { IPage, IProduct } from '../../interfaces'
import useDebounce from '../../utils/hooks/useDebounce'
import Wrapper from '../../components/wrapper/Wrapper'
import Corousel from '../../components/Corousel'
import Categories from '../categories/Categories'
import { useParams } from 'react-router-dom'
import { searchQueryType, sortDirectionType } from '../../types'
import Paginator from '../../components/Table/Paginator'

const items = [1, 2, 3, 4, 5, 6, 7, 8]
const ProductList = () => {
  const { categoryId } = useParams()
  const category = categoryId ? +categoryId : 1

  const [sortDir, setSortDir] = useState<sortDirectionType>('ASC')
  const [sortBy, setSortBy] = useState<searchQueryType>('name')
  const [pageSize, setRowsPerPageSize] = useState(5)
  const [pageNo, setPageNo] = useState(0)
  const [searchItem, setSearchItem] = useState<string>('')

  const { data, isLoading } = useGetProductsQuery(
    {
      categoryId: category,
      pageNo,
      pageSize,
      sortDir,
      sortBy
    },
    {
      pollingInterval: 8000
    }
  )

  const handleNextPage = () => {
    if (data?.nextPage) {
      setPageNo((prev) => prev + 1)
    }
  }
  const handlePrevPage = () => {
    if (data?.hasPreviousPage) {
      setPageNo((prev) => prev - 1)
    }
  }
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    if (data?.nextPage) {
      setRowsPerPageSize(+event.target.value)
    }
  }
  //const debounceSearchValue = useDebounce(searchItem, 500)

  // if (debounceSearchValue !== '' && data) {
  //   sortedArray = [...data].filter((item) => item.title.toLowerCase().includes(debounceSearchValue))
  // }

  return (
    <>
      <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
      <Categories />
      <Box sx={wrapperStyle}>
        {/* <EnhancedSelect items={sortItems} value={sort} handleChange={setSort} /> */}
        <Box component={'span'} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchBar handleSearch={setSearchItem} searchValue={searchItem} />
        </Box>
      </Box>
      <Wrapper>
        <Corousel />
        {isLoading &&
          items.map((item) => (
            <Skeleton
              key={item}
              sx={{ minHeight: '40vh', height: '100%', borderRadius: 1 }}
              animation="wave"
            />
          ))}

        {data &&
          data?.items &&
          data?.items.map((item) => (
            <Product
              stock={item.stock}
              reviews={item.reviews}
              id={item.id}
              description={item.description}
              imageUrl={item.imageUrl}
              price={item.price}
              categoryId={item.categoryId}
              name={item.name}
              key={item.id}
            />
          ))}
      </Wrapper>
      <Paginator
        currentPage={pageNo}
        totalPages={data?.totalPages || 0}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        rowsPerPage={pageSize}
        hasNextPage={data?.nextPage ?? true}
        hasPreviousPage={data?.hasPreviousPage ?? true}
      />
    </>
  )
}

export default ProductList
