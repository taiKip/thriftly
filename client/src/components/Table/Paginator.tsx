import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { SelectChangeEvent } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const Paginator = ({
  rowsPerPage,
  handleChangeRowsPerPage,
  handlePrevPage,
  handleNextPage,
  currentPage,
  hasPreviousPage,
  hasNextPage,
  totalPages
}: {
  rowsPerPage: number
  handleChangeRowsPerPage: (e: SelectChangeEvent) => void
  handlePrevPage: () => void
  handleNextPage: () => void
  currentPage: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  totalPages: number
}) => {
  return (
    <Toolbar sx={{ gap: 2 }}>
      <Typography color={'textPrimary'} sx={{ marginLeft: 'auto' }}>
        Rows per page
      </Typography>
      <Select
        value={rowsPerPage + ''}
        sx={{ padding: 0, border: 0 }}
        size="small"
        onChange={handleChangeRowsPerPage}>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
      <Box
        component={'div'}
        display={'flex'}
        minWidth={'200px'}
        gap={2}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ padding: '0 5px' }}>
        <IconButton
          size="small"
          onClick={handlePrevPage}
          sx={{ padding: '2px' }}
          disabled={!hasPreviousPage}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography color={'textPrimary'}>{`page ${currentPage + 1} of ${totalPages} `}</Typography>
        <IconButton size="small" onClick={handleNextPage} disabled={!hasNextPage}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Toolbar>
  )
}

export default Paginator
