import { AppBar, Icon, Menu, Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Header.css'

import { AccountCircle, Edit, Logout } from '@mui/icons-material'
import { useState } from 'react'

function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsMenuOpen(true)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setIsMenuOpen(false)
  }
  const profile = {
    name: 'Diego',
    lastname: 'Remote',
    email: 'diego@gmail.com',
  }

  return (
    <AppBar
      position="static"
      color="backgroudHeader"
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <img src="src/assets/logo_letras_fdfffd.webp" alt="Logo Ludohana" />
      <div className="headerLinks">
        <Link to="/">Inicio</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/settings">Ajustes</Link>
      </div>
      <div className="headerLogin">
        <Link to="/login">Iniciar Sesión</Link>
        <Icon
          sx={{ width: '40px', height: '40px', color: 'ludoGreenLight.main' }}
        >
          <AccountCircle sx={{ fontSize: '40px' }} onClick={handleClick} />
        </Icon>
        <Menu
          open={isMenuOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{ top: '15px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box textAlign={'center'} px="8px">
            <Typography>{profile.name + ' ' + profile.lastname}</Typography>
            <p>{profile.email}</p>
            <Link
              to="/profile"
              onClick={() => {
                handleClose()
              }}
            >
              <Button
                startIcon={<Edit />}
                size="small"
                variant="contained"
                color="success"
              >
                Editar
              </Button>
            </Link>
          </Box>
        </Menu>
        <Icon
          sx={{ width: '40px', height: '40px', color: 'ludoGreenLight.main' }}
        >
          <Logout sx={{ fontSize: '40px' }} />
        </Icon>
      </div>
    </AppBar>
  )
}

export default Header
