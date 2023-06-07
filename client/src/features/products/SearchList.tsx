import React from 'react'
import { useSearchProductByNameQuery } from './productApiSlice'
import Wrapper from '../../components/wrapper/Wrapper'
import { IProduct } from '../../interfaces'
import { Toolbar, Typography } from '@mui/material'
import Product from './Product'

const SearchList = ({ products }: { products: IProduct[] }) => {
  console.log(products)
  return (
    <Wrapper>
      {products &&
        products.map((item) => (
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
  )
}

export default SearchList
