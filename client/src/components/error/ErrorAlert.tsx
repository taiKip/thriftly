import Alert from '@mui/material/Alert'

const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <>
      {Boolean(error) && (
        <Alert severity="error" aria-live="assertive">
          {error}
        </Alert>
      )}
    </>
  )
}

export default ErrorAlert
