/**
 * @packages
 */
import { useState } from 'react'
import { useTheme } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import { SelectChangeEvent } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
/**
 * @components
 */
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableRow from './EnhancedTableRow'
import { useGetOrdersQuery } from './orderApiSlice'
import { sortDirectionType } from '../../types'
import Paginator from '../../components/Table/Paginator'

const tableNav = ['Date', 'Customer', 'Status', 'Total']

const EnhancedTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDir, setSortDir] = useState<sortDirectionType>('ASC')
  const { data, isSuccess } = useGetOrdersQuery({ pageNo: page, pageSize: rowsPerPage, sortDir })
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
          {data &&
            data.items?.map((item) => (
              <EnhancedTableRow
                key={item.orderId}
                orderId={item.orderId}
                address={item.address}
                createdAt={item.createdAt}
                orderItems={item.orderItems}
                orderStatus={item.orderStatus}
                total={item.total}
              />
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
    </TableContainer>
  )
}

export default EnhancedTable
