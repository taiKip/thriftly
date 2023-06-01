import { ChangeEvent } from 'react'

import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'inherit',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3)
  },
  border: `1px solid ${
    theme.palette.mode == 'dark' ? theme.palette.secondary.light : theme.palette.primary.dark
  } `,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const SearchBar = ({
  handleSearch,
  searchValue
}: {
  searchValue: string
  handleSearch: (search: string) => void
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
  }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color={'disabled'} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        color="secondary"
        value={searchValue}
        onChange={handleChange}
      />
    </Search>
  )
}

export default SearchBar
