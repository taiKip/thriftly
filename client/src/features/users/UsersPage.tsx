/**
 * @packages
 */
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Container from '@mui/material/Container'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import { SelectChangeEvent } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
/**
 * @components
 */
import { useGetUsersQuery } from './userSlice'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import Paginator from '../../components/Table/Paginator'
import UserProfile from './UserProfile'

const UsersPage = () => {
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUser, setSelecteUser] = useState<number | null>(null)
  const { data } = useGetUsersQuery(
    { pageNo: page, pageSize: rowsPerPage },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      pollingInterval: 20000
    }
  )
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
    if (data?.nextPage) {
      setRowsPerPage(+event.target.value)
    }
  }
  const handleClose = () => {
    setOpenDialog((prev) => !prev)
  }
  const handleActionRowClick = (id: number) => {
    setSelecteUser(id)
    setOpenDialog(true)
  }
  return (
    <>
      <SmallScreenAppBar />
      <Dialog
        fullWidth
        sx={{ top: '-30vh' }}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="add review"
        aria-describedby="add a review to  product">
        <UserProfile userId={selectedUser} handleClose={handleClose} />
      </Dialog>
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
                    <IconButton onClick={() => handleActionRowClick(item.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Paginator
          currentPage={page}
          totalPages={data?.totalPages || 0}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          rowsPerPage={rowsPerPage}
          hasNextPage={data?.nextPage ?? true}
          hasPreviousPage={data?.hasPreviousPage ?? true}
        />
      </Container>
    </>
  )
}

export default UsersPage
