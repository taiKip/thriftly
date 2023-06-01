import Stack from '@mui/material/Stack'
import CardMedia from '@mui/material/CardMedia'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import image from '../../assets/image.avif'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useUploadImageMutation } from './uploadSlice'
import { ChangeEvent, useEffect, useState } from 'react'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

const UploadFile = ({ setFileUrl }: { setFileUrl: (url: string) => void }) => {
  const [uploadFile, { isLoading, isSuccess }] = useUploadImageMutation()
  const [file, setFile] = useState<File | null>()
  const [uploadedImageUrl, setUplaodedImagUrl] = useState<string | null>()
  const [open, setOpenSnackbar] = useState(false)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }
  const handleUploadFile = async () => {
    if (isLoading) {
      return
    }
    if (file) {
      const formData = new FormData()
      formData.set('file', file)
      try {
        const response = await uploadFile(formData).unwrap()
        if (response) {
          setFileUrl(response.fileUrl)
          setUplaodedImagUrl(response.fileUrl)
          console.log(response)
          setOpenSnackbar(true)
        }
      } catch (err) {
        console.error(err)
        setOpenSnackbar(false)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess) {
        setOpenSnackbar(false)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [open, isSuccess])
  return (
    <Stack sx={{ display: 'flex', gap: 3 }}>
      <Snackbar
        open={isLoading}
        autoHideDuration={6000}
        message="Uploading..."
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        sx={{ top: '80vh' }}
      />

      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          File uploaded successfully 🎉
        </Alert>
      </Snackbar>

      {isSuccess && uploadedImageUrl && (
        <CardMedia
          component={'img'}
          height={'200px'}
          image={uploadedImageUrl}
          sx={{ objectFit: 'contain' }}
        />
      )}
      <Button component="label">
        <input accept="image/*" type="file" onChange={handleFileChange} style={{ width: '100%' }} />
      </Button>
      <Button
        startIcon={<AddPhotoAlternateIcon />}
        color="primary"
        component="label"
        variant="contained"
        disabled={isLoading || !file}
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleUploadFile}>
        {!isLoading && 'Upload Image'}
        {isLoading && <LinearProgress />}
      </Button>
    </Stack>
  )
}

export default UploadFile
