import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  TextField,
  Typography
} from '@mui/material'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import { FormEvent, useState, ChangeEvent } from 'react'
import { fieldStyle } from '../../styles'
import { useAddReviewMutation } from './productApiSlice'
import { ArrowBack } from '@mui/icons-material'
import { IReview } from '../../interfaces'

const AddReviewForm = ({
  open,
  toggleReviewForm,
  productId,
  showPopUp
}: {
  open: boolean
  toggleReviewForm: () => void
  productId: number
  showPopUp: () => void
}) => {
  const [addReview, { isLoading }] = useAddReviewMutation()

  const [rating, setRating] = useState<number | null>(5)
  const [comment, setComment] = useState('')
  const [nickName, setNickName] = useState('')
  const [formError, setFormError] = useState(false)

  const handleClose = () => {
    toggleReviewForm()
  }

  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }
  const handleChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value)
  }
  const canSave = [rating, comment, nickName].every(Boolean) && !isLoading
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(false)
    const newReview: Partial<IReview> = { comment, username: nickName, rating: rating || 5 }
    if (canSave) {
      try {
        await addReview({ review: newReview, productId }).unwrap()
        setRating(5)
        setComment('')
        setNickName('')
      } catch (err) {
        setFormError(true)
      } finally {
        toggleReviewForm()
        console.log('Pop up shown')
        showPopUp()
      }
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="add review"
      aria-describedby="add a review to  product">
      <DialogActions>
        <IconButton aria-label="back" sx={{ marginRight: 'auto' }} onClick={handleClose}>
          <ArrowBack />
        </IconButton>
      </DialogActions>
      <DialogTitle>Add Review 😊 </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography component={'legend'} color={'grayText'}>
              Rating
            </Typography>
            <Rating
              name="Overall rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
            <TextField
              onChange={handleChangeComment}
              sx={fieldStyle}
              label="Review"
              color="secondary"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              onChange={handleChangeNickName}
              sx={fieldStyle}
              label="NickName"
              color="secondary"
              fullWidth
              required
            />
          </Box>
          <Button variant="contained" type="submit" endIcon={<HistoryEduIcon />} color="warning">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewForm
