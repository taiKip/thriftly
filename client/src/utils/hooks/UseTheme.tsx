import { useState, useMemo, useEffect } from 'react'
import { purple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { before } from 'node:test'

const UseTheme = () => {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    const localData = localStorage.getItem('theme')
    return localData ? JSON.parse(localData) : 'dark'
  })
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(mode))
  }, [mode])
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#fefefe'
          },
          secondary: purple,
          mode: mode
        },

        typography: {
          fontFamily: 'Quicksand',
          fontWeightLight: 400,
          fontWeightRegular: 500,
          fontWeightMedium: 600,
          fontWeightBold: 700,
          button: {
            textTransform: 'none'
          }
        },
        components: {
          MuiCardMedia: {
            styleOverrides: {
              root: {
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform .3s ease-in-out'
                },
                objectFit: 'cover'
              }
            }
          },
          MuiBadge: {
            styleOverrides: {
              root: {
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform .3s ease-in-out'
                }
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                cursor: 'pointer'
              }
            }
          }
        }
      }),
    [mode]
  )
  return {
    theme,
    colorMode
  }
}

export default UseTheme
