import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { IReview } from '../../interfaces'
import { ListItemText } from '@mui/material'
import moment from 'moment'
import { DATE_FORMAT } from '../../utils/AppConstants'

const ReviewList = ({
  open,
  reviews,
  isLoading,
  isError,
  toggleReview
}: {
  open: boolean
  reviews: IReview[]
  isLoading: boolean
  isError: boolean
  toggleReview: () => void
}) => {
  const handleClose = () => {
    toggleReview()
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="new Address"
      aria-describedby="add new Address">
      <DialogActions sx={{ padding: 0 }}>
        <IconButton aria-label="back" sx={{ marginLeft: 'auto' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <List sx={{ padding: '0 8px' }}>
        {isLoading && <p>Loading...</p>}
        {reviews &&
          reviews.map((review) => (
            <ListItem
              key={review.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                border: '1px solid grey',
                borderRadius: 1,
                marginBottom: 1
              }}>
              <Box component="div" display="flex" alignItems={'center'}>
                <Typography variant="h6" color={'text.primary'}>
                  {review.title}
                </Typography>
                <Rating name="read-only" value={review.rating} readOnly />
              </Box>
              <Typography component="span" variant="body2" color="text.primary">
                by {review.username}
              </Typography>
              <ListItemText
                primary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary">
                    {review.comment}
                  </Typography>
                }
                secondary={`${moment(review.createdAt).format(DATE_FORMAT)}`}
              />
            </ListItem>
          ))}
      </List>
    </Dialog>
  )
}

export default ReviewList
