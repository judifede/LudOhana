import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

import { customTheme } from '../themes/theme'
import { CssBaseline, Grid, ThemeProvider } from '@mui/material'
import { MenuContext } from '../context/context'
import { useState } from 'react'

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <ThemeProvider theme={customTheme}>
      <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        <CssBaseline />
        <Header />
        <main>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Outlet />
          </Grid>
        </main>
      </MenuContext.Provider>
    </ThemeProvider>
  )
}

export default MainLayout
