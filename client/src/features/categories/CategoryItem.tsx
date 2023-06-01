import { Button, colors } from '@mui/material'
import React from 'react'
import { ICategory } from '../../interfaces'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { setPageInfo } from '../page/pageInfoSlice'

const CategoryItem = ({ category }: { category: ICategory }) => {
  const dispatch = useAppDispatch()
  const { categoryId } = useParams()
  const handleClick = () => {
    dispatch(setPageInfo({ name: category.name, description: category.description }))
  }
  return (
    <Link to={`/category/${category.id}`} onClick={handleClick}>
      <Button
        variant="contained"
        size="small"
        sx={{ minWidth: '80px' }}
        disabled={+categoryId! == category.id}>
        {category.name}
      </Button>
    </Link>
  )
}

export default CategoryItem
