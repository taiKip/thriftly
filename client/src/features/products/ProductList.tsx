import { Box, Typography, Toolbar, Skeleton } from '@mui/material'
import Product from './Product'
import { useGetProductsQuery } from './productApiSlice'
import { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { wrapperStyle } from '../../styles'
import EnhancedSelect from '../../components/EnhancedSelect'
import { sortItems } from '../../utils/functions/extraValues'
import { sortArray } from '../../utils/functions/Comparator'

import { IPage, IProduct } from '../../interfaces'
import useDebounce from '../../utils/hooks/useDebounce'
import Wrapper from '../../components/wrapper/Wrapper'
import Corousel from '../../components/corousel/Corousel'
import Categories from '../categories/Categories'
import { useParams } from 'react-router-dom'
import { useGetCategoriesQuery } from '../categories/categoryApiSlice'
import { searchQueryType, sortDirectionType } from '../types'

const items = [1, 2, 3, 4, 5, 6, 7, 8]
const ProductList = () => {
  const { categoryId } = useParams()
  const category = categoryId ? +categoryId : 1

  const [sortDir, setSortDir] = useState<sortDirectionType>('ASC')
  const [sortBy, setSortBy] = useState<searchQueryType>('name')
  const [pageSize, setPageSize] = useState(10)
  const [pageNo, setPageNo] = useState(0)
  const [searchItem, setSearchItem] = useState<string>('')

  const { data, isLoading, isSuccess } = useGetProductsQuery(
    {
      categoryId: category,
      pageNo,
      pageSize,
      sortDir,
      sortBy
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  )

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
          data?.products &&
          data?.products.map((item) => (
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
    </>
  )
}

export default ProductList
