import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

import { customTheme } from '../themes/theme'
import { CssBaseline, Grid, ThemeProvider } from '@mui/material'

function MainLayout() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Grid container spacing={2}>
          <Outlet />
        </Grid>
      </main>
    </ThemeProvider>
  )
}

export default MainLayout
