import { FormEvent, useState, ChangeEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

import { useGetCategoriesQuery } from '../categories/categoryApiSlice'
import { useAddNewProductMutation } from './productApiSlice'
import { fieldStyle } from '../../styles'
import UploadFile from '../uploadFile/UploadFile'
import { IError } from '../../interfaces'
import ErrorHandler from '../../components/error/ErrorHandler'

const AddProductForm = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductMutation()
  const { data: categories, isLoading: categoryIdIsLoading } = useGetCategoriesQuery(undefined, {
    pollingInterval: 8000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  })
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('1')
  const [formError, setFormError] = useState(false)

  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const [error, setError] = useState<IError | null>(null)

  const handleCategoryId = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value)
  }
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }
  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }
  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleStock = (event: ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value)
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setFormError(false)
    setNameError(false)
    setDescriptionError(false)
    if (name === '') {
      setNameError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }

    if (name && description && categoryId && imageUrl && price && stock) {
      const itemPrice = +price

      const product = {
        name: name.trim(),
        description: description.trim(),
        categoryId: +categoryId,
        imageUrl,
        price: itemPrice,
        stock: +stock
      }

      await addNewProduct(product)
        .unwrap()
        .then((payload) => {
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
    <Container sx={{ padding: { xs: 2, sm: 6 }, overflow: 'scroll' }}>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Add New Product
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={handleName}
          sx={fieldStyle}
          label="Product Name"
          color="secondary"
          fullWidth
          required
          error={nameError}
        />

        <TextField
          onChange={handleDescription}
          sx={fieldStyle}
          label="Description"
          color="secondary"
          fullWidth
          required
          multiline
          rows={2}
          error={descriptionError}
        />

        <UploadFile setFileUrl={setImageUrl} />
        <Stack display={'flex'} gap={2} alignItems={'center'}>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel htmlFor="outlined-adornment-price" color="secondary">
              Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-price"
              type="number"
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
              label="Price"
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <InputLabel id="categoryId-select" color="secondary">
              Category
            </InputLabel>
            <Select
              labelId="categoryId-select-label"
              id="categoryId-select"
              value={categoryId}
              label="Category"
              onChange={handleCategoryId}
              color="secondary">
              {categories &&
                categories?.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          disabled={!imageUrl}
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default AddProductForm
