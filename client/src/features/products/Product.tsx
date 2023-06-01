import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions, IconButton } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { addToCart } from '../cart/cartSlice'
import { IProduct } from '../../interfaces'

const Product = ({ id, imageUrl, name, price, stock }: IProduct) => {
  const dispatch = useAppDispatch()
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        imageUrl,
        price,
        name,
        quantity: 1,
        stock
      })
    )
  }
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height={200}
          image={imageUrl}
          alt={name}
          loading="lazy"
          sx={{ minHeight: { xs: 150, sm: 200 } }}
        />
        <CardContent sx={{ padding: 0.3 }}>
          <Typography
            gutterBottom
            component="div"
            fontSize="1em"
            fontWeight="bold"
            sx={{ fontSize: { xs: '0.8em' }, fontWeight: { xs: 'medium' } }}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ borderTop: 1, borderTopStyle: 'dashed', borderTopColor: 'gray' }}>
        <Typography>€{price.toFixed(2)}</Typography>
        <IconButton sx={{ ml: 'auto', color: 'green' }} onClick={() => handleAddToCart()}>
          <AddShoppingCartOutlinedIcon />
        </IconButton>
        <NavLink to={`/products/${id}`}>
          <IconButton>
            <ArrowForward />
          </IconButton>
        </NavLink>
      </CardActions>
    </Card>
  )
}

export default Product
