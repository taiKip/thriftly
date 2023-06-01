import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

interface IActionButtonProps {
  next: () => void
  prev: () => void
  current: number
  max: number
}
const ActionButton = ({ next, prev, current, max }: IActionButtonProps) => {
  return (
    <Stack
      display={'flex'}
      flexDirection={'row'}
      gap={2}
      sx={{ position: 'absolute', right: '20px', bottom: '20px' }}>
      <IconButton onClick={prev} disabled={current <= 0 ? true : false}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={next} disabled={current >= max ? true : false}>
        <ArrowForward />
      </IconButton>
    </Stack>
  )
}

export default ActionButton
