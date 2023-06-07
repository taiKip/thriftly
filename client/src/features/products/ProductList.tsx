import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Box, Toolbar, Skeleton } from '@mui/material'
import Product from './Product'
import { useGetProductsQuery } from './productApiSlice'
import SearchBar from '../../components/SearchBar'
import { wrapperStyle } from '../../styles'
import { SelectChangeEvent } from '@mui/material'

import { IPage, IProduct } from '../../interfaces'
import useDebounce from '../../utils/hooks/useDebounce'
import Wrapper from '../../components/wrapper/Wrapper'
import Corousel from '../../components/Corousel'
import Categories from '../categories/Categories'

import { searchQueryType, sortDirectionType } from '../../types'
import { useLazySearchProductByNameQuery } from './productApiSlice'
import Paginator from '../../components/Table/Paginator'
import SearchList from './SearchList'

const items = [1, 2, 3, 4, 5, 6, 7, 8]

const ProductList = () => {
  const { categoryId } = useParams()
  const category = categoryId ? +categoryId : 0

  const [sortDir, setSortDir] = useState<sortDirectionType>('ASC')
  const [sortBy, setSortBy] = useState<searchQueryType>('name')
  const [pageSize, setRowsPerPageSize] = useState(10)
  const [pageNo, setPageNo] = useState(0)
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearchValue = useDebounce(searchValue, 600)
  const [searchProducts, { isFetching, data = [], isError, isSuccess }] =
    useLazySearchProductByNameQuery()
  useEffect(() => {
    if (debounceSearchValue.trim() !== '') {
      searchProducts(debounceSearchValue)
    }
  }, [debounceSearchValue])

  const { data: products, isLoading } = useGetProductsQuery(
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
    if (products?.nextPage) {
      setPageNo((prev) => prev + 1)
    }
  }
  const handlePrevPage = () => {
    if (products?.hasPreviousPage) {
      setPageNo((prev) => prev - 1)
    }
  }
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    if (products?.nextPage) {
      setRowsPerPageSize(+event.target.value)
    }
  }

  return (
    <>
      <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
      <Categories />
      <Box sx={wrapperStyle}>
        <Box component={'span'} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchBar handleSearch={setSearchValue} searchValue={searchValue} />
        </Box>
      </Box>
      {data.length > 0 && <SearchList products={data} />}
      {data.length == 0 && (
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

          {products &&
            products.items &&
            products?.items.map((item) => (
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
      )}
      <Paginator
        currentPage={pageNo}
        totalPages={products?.totalPages || 0}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        rowsPerPage={pageSize}
        hasNextPage={products?.nextPage ?? true}
        hasPreviousPage={products?.hasPreviousPage ?? true}
      />
    </>
  )
}

export default ProductList
