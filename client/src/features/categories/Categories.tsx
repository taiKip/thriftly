import { Button, Skeleton, Toolbar } from '@mui/material'
import CategoryItem from './CategoryItem'
import { useGetCategoriesQuery } from './categoryApiSlice'
import { useEffect, useState } from 'react'
import { ICategory } from '../../interfaces'
import { useParams } from 'react-router-dom'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'

const skeletonArray = [1, 2, 3, 4]
const Categories = () => {
  const { data, isLoading, isError, isSuccess } = useGetCategoriesQuery(undefined, {
    pollingInterval: 80000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
  return (
    <>
      <SmallScreenAppBar />
      <Toolbar sx={{ gap: 2, overflowX: 'scroll' }}>
        <>
          {isLoading &&
            skeletonArray.map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                animation="wave"
                width={'80px'}
                height={'30px'}
                sx={{ borderRadius: 1 }}
              />
            ))}
          {data && data.map((item) => <CategoryItem category={item} key={item.id} />)}
        </>
      </Toolbar>
    </>
  )
}

export default Categories
