import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Container from '@mui/material/Container'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import CheckBox from '@mui/icons-material/CheckBox'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { useGetUsersQuery } from './userSlice'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material'

const UsersPage = () => {
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const { data } = useGetUsersQuery(
    { pageNo: page, pageSize: rowsPerPage },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  )
  if (data) {
    console.log(data)
  }
  const handleNextPage = () => {
    if (data?.nextPage) {
      setPage((prev) => prev + 1)
    }
  }
  const handlePrevPage = () => {
    if (data?.hasPreviousPage) {
      setPage((prev) => prev - 1)
    }
  }
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(+event.target.value)
  }
  console.log('Page::', page, 'Rows::', rowsPerPage)
  return (
    <>
      <SmallScreenAppBar />
      <Toolbar sx={{ display: { sm: 'none', xs: 'block' } }} />
      <Container sx={{ width: '100vw' }}>
        <Table>
          <TableHead sx={{ width: '100%' }}>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(odd)': { background: theme.palette.action.hover }
                  }}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.role}</TableCell>
                  <TableCell align="center">{item.banned ? 'BANNED' : 'ACTIVE'}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
              disabled={!data?.hasPreviousPage}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography color={'textPrimary'}>{`page ${page + 1} of ${data?.totalPages} `}</Typography>
            <IconButton size="small" onClick={handleNextPage} disabled={!data?.nextPage}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </>
  )
}

export default UsersPage
