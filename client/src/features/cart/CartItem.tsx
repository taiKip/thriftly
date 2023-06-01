import { Button, CardMedia, Box, TableCell, TableRow, Typography, IconButton } from '@mui/material'

import { cartItemType, decrementQuantity, incrementQuantity, removeItem } from './cartSlice'
import { useAppDispatch } from '../../app/hooks'
import { DeleteOutline } from '@mui/icons-material'
const textStyles = { xs: '0.6em', sm: '1em' }
const buttonStyles = { xs: 'small', sm: 'medium' }
const CartItem = ({ image, quantity, price, name, id, stock }: cartItemType) => {
  const dispatch = useAppDispatch()
  const handleIncrement = () => {
    if (quantity <= stock) {
      dispatch(incrementQuantity(id))
    }
  }
  const handleDecrement = () => {
    if (quantity <= 1) {
      dispatch(removeItem(id))
    }
    dispatch(decrementQuantity(id))
  }
  const handleRemove = () => {
    dispatch(removeItem(id))
  }
  const total = price * quantity

  //
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{
              height: { xs: 30, sm: 40 },
              width: { xs: 30, sm: 40 },
              borderRadius: 1
            }}
            image={image ?? ' '}
          />

          <Typography sx={{ fontSize: textStyles }}>{name}</Typography>
        </Box>
      </TableCell>
      <TableCell align="center" padding="none">
        <Box
          sx={{
            display: 'flex',
            width: { xs: 80, sm: 150 },
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Button variant="contained" onClick={handleDecrement} size="small">
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleIncrement}
            size="small"
            disabled={quantity >= stock}>
            +
          </Button>
        </Box>
      </TableCell>
      <TableCell>
        <Typography sx={{ fontSize: textStyles }}>€{total.toFixed(2)}</Typography>
      </TableCell>
      <TableCell>
        <IconButton color="error" onClick={handleRemove} size="small">
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default CartItem
