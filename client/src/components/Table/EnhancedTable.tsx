import {
  TableContainer,
  TableHead,
  Table,
  CardHeader,
  TableCell,
  TableRow,
  TableBody,
  Menu
} from '@mui/material'
import { ITableProps } from '../../interfaces'

const EnhancedTable = ({ title, subheader, headerCells, orders }: ITableProps) => {
  return (
    <TableContainer>
      <CardHeader title={title} subheader={subheader} />
      <Table>
        <TableHead>
          <TableRow>
            {headerCells.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.revenue}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EnhancedTable
