import Skeleton from '@mui/material/Skeleton'

const TitleSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{ borderRadius: 1, height: { xs: '0.9em', sm: '2em' } }}
      animation="wave"
    />
  )
}

export default TitleSkeleton
