import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

import { customTheme } from '../themes/theme'
import { CssBaseline, ThemeProvider  } from '@mui/material'

function MainLayout() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}

export default MainLayout
