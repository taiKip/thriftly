import React from 'react'
import { IError } from '../../interfaces'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const ErrorHandler = ({ error }: { error: IError }) => {
  return (
    <Snackbar
      open={Boolean(error)}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}>
      <>
        {error &&
          error.data.map((item, index) => (
            <Alert severity="warning" key={index}>
              {`${item.httpStatus} :: ${item.message}`}
            </Alert>
          ))}
      </>
    </Snackbar>
  )
}

export default ErrorHandler
