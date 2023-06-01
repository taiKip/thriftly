import React, { FormEvent, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  SelectChangeEvent,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
  Stack
} from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { Camera } from '@mui/icons-material'
import { useAddNewCategoryMutation, useGetCategoriesQuery } from '../categories/categoryApiSlice'
import { fieldStyle, inputFormStyle } from '../../styles/index'
import { useUploadImageMutation } from '../uploadFile/uploadSlice'

const AddNewCategoryForm = () => {
  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [formError, setFormError] = useState(false)

  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const [uploadImage, { isError, isLoading: loading, isSuccess }] = useUploadImageMutation()

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }
  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
    const formData = new FormData()
    if (image) {
      formData.append('file', image)
      try {
        const res = await uploadImage(formData).unwrap()
        console.log(res)
      } catch (error) {
        setFormError(true)
      }
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setFormError(false)
    console.log(imageUrl)
    setNameError(false)
    setDescriptionError(false)
    if (name === '') {
      setNameError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }

    if (name && description && imageUrl) {
      const category = { name, description, image: imageUrl }
      console.log(category)
      try {
        await addNewCategory(category).unwrap()
        console.log(category)
        setName('')
        setDescription('')
        setImage(null)
        navigate('/')
      } catch (error) {
        setFormError(true)
      }
    }
  }
  return (
    <Container sx={inputFormStyle}>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Add New Category
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {formError && (
          <Typography color="error" display={'flex'} alignItems={'center'}>
            Something went wrong
            <SentimentVeryDissatisfiedIcon />
          </Typography>
        )}
        <TextField
          onChange={handleName}
          sx={fieldStyle}
          label="Category Name"
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
        {imageError && (
          <Typography color="error" display={'flex'} alignItems={'center'}>
            Something went wrong
            <SentimentVeryDissatisfiedIcon />
          </Typography>
        )}
        <Button
          color="primary"
          component="label"
          variant="contained"
          fullWidth
          endIcon={
            imageLoading ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <Camera color="success" />
            )
          }
          sx={{ mb: 2 }}>
          Upload Image
          <input hidden accept="image/*" type="file" onChange={handleUploadImage} />
        </Button>

        <Button type="submit" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default AddNewCategoryForm
