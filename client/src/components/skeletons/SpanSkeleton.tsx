import Skeleton from '@mui/material/Skeleton'

const SpanSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{ borderRadius: 1, height: { xs: '0.9em', sm: '1.8em' } }}
      animation="wave"
    />
  )
}

export default SpanSkeleton
