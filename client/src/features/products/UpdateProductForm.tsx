import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  SelectChangeEvent,
  OutlinedInput,
  InputAdornment
} from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { fieldStyle } from '../../styles'
import { useGetCategoriesQuery } from '../categories/categoryApiSlice'
import { useGetProductsQuery, useUpdateProductMutation } from './productApiSlice'
import { IError } from '../../interfaces'
import UploadFile from '../uploadFile/UploadFile'

const UpdateProductForm = () => {
  const { productId } = useParams()
  const { product, isLoading: loadingProduct } = useGetProductsQuery(
    {},
    {
      selectFromResult: ({ data, isLoading, error }) => ({
        product: data?.products?.find((item) => item.id == +productId!),
        error,
        isLoading
      })
    }
  )
  const { data: categories, isLoading } = useGetCategoriesQuery()

  const [updateProduct] = useUpdateProductMutation()
  const navigate = useNavigate()
  const [name, setName] = useState(product?.name)
  const [description, setDescription] = useState(product?.description)
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState(product?.price + '')
  const [stock, setStock] = useState(product?.stock + '')

  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [imageUrl, setImageUrl] = useState(product?.imageUrl)

  const [error, setError] = useState<IError | null>(null)

  const handleCategoryId = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value)
  }
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }
  const handleStock = (event: ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (productId && name && description && categoryId && price && stock) {
      console.log('updating')
      const product = {
        name,
        categoryId: +categoryId,
        description,
        imageUrl,
        price: +price,
        stock: +stock
      }
      console.log(product)
      await updateProduct({ product, productId })
        .unwrap()
        .then((payload) => {
          console.log(payload)
          setCategoryId('')
          setDescription('')
          setName('')
          setImageUrl('')
          setPrice('')
          setStock('')
          navigate('/')
        })
        .catch((err) => {
          setError(err)
          console.log(error)
        })
    }
  }
  return (
    <Container sx={{ marginTop: 2, overflow: 'scroll' }}>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Update Product
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={fieldStyle}
          label="Product Name"
          color="secondary"
          fullWidth
          multiline
          required
          error={nameError}
        />

        <TextField
          onChange={(e) => setDescription(e.target.value)}
          sx={fieldStyle}
          value={description}
          label="Description"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={descriptionError}
        />
        <CardMedia
          component="img"
          image={imageUrl}
          sx={{ borderRadius: 1, objectFit: 'contain', maxHeight: '30vh', m: 2 }}
        />
        <UploadFile setFileUrl={setImageUrl} />
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel htmlFor="outlined-adornment-price" color="secondary">
            Price
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-price"
            type="number"
            value={price}
            color="secondary"
            onChange={handlePrice}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Price"
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel htmlFor="outlined-adornment-price" color="secondary">
            Stock
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-price"
            type="number"
            value={stock}
            color="secondary"
            onChange={handleStock}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Price"
          />
        </FormControl>
        <FormControl fullWidth sx={{ paddingBottom: 2 }}>
          <InputLabel id="category-select" color="secondary">
            Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={categoryId}
            label="Category"
            onChange={handleCategoryId}
            color="secondary">
            {categories?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default UpdateProductForm
