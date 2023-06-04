import { useTheme } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableRow, { tableRowProps } from './EnhancedTableRow'

const tableNav = ['Date', 'Customer', 'Status', 'Total']
export const tableItems = [
  {
    firstName: 'John',
    lastName: 'Doe',
    repairRequest: 'Leaky faucet in the bathroom sink',
    complaintId: 12345,
    severity: 'Normal',
    image: '../assets/profile.jpg',
    status: 'fixed'
  },
  {
    firstName: 'Mary',
    lastName: 'Smith',
    repairRequest: 'Clogged drain in the kitchen sink',
    complaintId: 12346,
    severity: 'Normal',
    status: 'pending'
  },
  {
    firstName: 'David',
    lastName: 'Lee',
    repairRequest: 'Broken window in the living room',
    complaintId: 12347,
    severity: 'Emergency',
    status: 'pending'
  },
  {
    firstName: 'Rachel',
    lastName: 'Johnson',
    repairRequest: 'Flickering lights in the bedroom',
    complaintId: 12348,
    severity: 'Normal',
    status: 'fixed'
  }
] as tableRowProps[]

const EnhancedTable = () => {
  const theme = useTheme()
  return (
    <TableContainer>
      <EnhancedTableHead />
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
                inputProps={{
                  'aria-label': 'select all orders'
                }}
              />
            </TableCell>
            {tableNav.map((nav) => (
              <TableCell key={nav}>{nav}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ padding: 1 }}>
          {tableItems.map((item) => (
            <EnhancedTableRow
              key={item.complaintId}
              complaintId={item.complaintId}
              firstName={item.firstName}
              lastName={item.lastName}
              repairRequest={item.repairRequest}
              severity={item.severity}
              status="pending"
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ fontFamily: 'inherit' }}
        component="div"
        count={5}
        rowsPerPage={5}
        page={1}
        onPageChange={() => console.log('changed')}
        onRowsPerPageChange={() => console.log('page change')}
      />
    </TableContainer>
  )
}

export default EnhancedTable
