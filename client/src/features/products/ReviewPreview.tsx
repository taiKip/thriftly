import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
export type propsType = { anchorEl: null | HTMLElement; handleClose: () => void }
const ReviewPreview = ({ anchorEl, handleClose }: propsType) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  )
}

export default ReviewPreview
