import { Link, useNavigate, useParams } from 'react-router-dom'

import { Alert, Button, CardMedia, Container, Typography, Rating, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useTheme } from '@mui/material/styles'
import { Stack } from '@mui/system'
import { useDeleteProductMutation, useGetProductsQuery } from './productApiSlice'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { addToCart } from '../cart/cartSlice'
import Snackbar from '@mui/material/Snackbar'
//import { selectCurrentUser } from '../auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCurrentUserToken } from '../auth/authSlice'
import AddReviewForm from './AddReviewForm'
import useAuth from '../../utils/hooks/useAuth'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'

const SingleProductPage = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const token = useAppSelector(selectCurrentUserToken)
  const [openReviewForm, setOpenReviewForm] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const theme = useTheme()
  const { isAdmin, isManager } = useAuth()
  const dispatch = useAppDispatch()
  const [deleteProduct, { isSuccess: deleteSuccess }] = useDeleteProductMutation()
  const [deleteError, setDeleteError] = useState('')
  const { product, isLoading, error } = useGetProductsQuery(
    {},
    {
      selectFromResult: ({ data, isLoading, error }) => ({
        product: data?.products?.find((item) => item.id == +productId!),
        error,
        isLoading
      })
    }
  )

  const handleShowPopUp = () => {
    setShowPopUp(true)
  }
  useEffect(() => {
    if (!showPopUp) {
      return
    }
    const timer = setTimeout(() => {
      setShowPopUp((prev) => !prev)
    }, 2000)

    return () => clearTimeout(timer)
  }, [showPopUp])
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong</div>
  }

  const handleDelete = async () => {
    await deleteProduct({ id: productId! })
      .unwrap()
      .then((payload) => {
        setShowPopUp(true)
      })
      .catch((err) => {
        if (err.status === 400) {
          setDeleteError(`Bad request::check user details`)
        }
        if (err.status === 401) {
          setDeleteError('Unauthorized')
        }
        if (err.status?.data) {
          setDeleteError(`${err.data.httpStatus}::${err.data.message}`)
        }
      })
    navigate('/', { replace: true })
  }
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }))
    }
  }
  const handleUpdate = () => {
    navigate(`/edit/${product?.id}`)
  }
  const handleToggleReview = () => {
    setOpenReviewForm((prev) => !prev)
  }
  return (
    <Container
      component={'section'}
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
        maxHeight: '80vh',
        paddingTop: 0,
        marginRight: 0,
        marginLeft: 0
      }}>
      {showPopUp && <Alert> Review added 😇</Alert>}
      {deleteError && <Alert>{deleteError}</Alert>}
      <SmallScreenAppBar />
      <div
        style={{
          position: 'relative',
          display: 'grid',
          placeItems: 'center'
        }}>
        <CardMedia
          component="img"
          image={product?.imageUrl}
          sx={{ borderRadius: 1, objectFit: 'contain', height: '52vh', m: 2 }}
        />
        <Typography fontWeight="bold" color="secondary" variant="h5">
          {product?.name}
        </Typography>
        <Typography color={theme.palette.mode === 'dark' ? 'primary' : 'inherit'}>
          {product?.description}
        </Typography>
        <Stack
          display={'flex'}
          flexDirection={'row'}
          gap={'3px'}
          alignItems={'center'}
          fontSize={'1em'}>
          <Typography color={'green'} component={'p'} fontSize={'inherit'} fontWeight={'bold'}>
            {'€' + product?.price}
          </Typography>

          <Button sx={{ gap: '3px' }}>
            <Rating
              name="rating"
              defaultValue={2.5}
              precision={0.5}
              readOnly
              size="small"
              value={product?.averageRating || 5}
            />

            <Typography>({product?.reviews?.length})</Typography>
          </Button>

          <Button
            variant="text"
            sx={{ color: '#6b6b6b', fontSize: '1em' }}
            onClick={() => setOpenReviewForm((prev) => !prev)}>
            Write Review
          </Button>
          {openReviewForm && (
            <AddReviewForm
              toggleReviewForm={handleToggleReview}
              open={openReviewForm}
              showPopUp={handleShowPopUp}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              productId={+productId!}
            />
          )}
        </Stack>
      </div>
      <Stack display={'flex'} gap={1} width="100%" marginBottom={8}>
        <Button
          variant="outlined"
          color="success"
          endIcon={<ShoppingCartCheckout />}
          onClick={handleAddToCart}>
          Add to cart
        </Button>
        {token &&
          (isAdmin || isManager) && ( //user exists ..todo
            <>
              <Button
                variant="outlined"
                color="warning"
                endIcon={<EditIcon />}
                onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
      </Stack>
    </Container>
  )
}

export default SingleProductPage
