import { AppBar, Icon, Menu, Box, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

import { AccountCircle, Edit, Logout } from '@mui/icons-material'
import { useState } from 'react'

import logoURL from '../../assets/logo_letras_fdfffd.webp'

function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const profile =
    localStorage.getItem('profile') &&
    JSON.parse(localStorage.getItem('profile'))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsMenuOpen(true)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setIsMenuOpen(false)
  }

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('profile')
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    navigate('/')
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
      <img src={logoURL} alt="Logo Ludohana" />
      <div className="headerLinks">
        <Link to="/">Inicio</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/settings">Ajustes</Link>
      </div>

      {localStorage.getItem('token') ? (
        <div className="headerLogin">
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
              {profile && (
                <>
                  <Typography>
                    {profile.name + ' ' + profile.lastName}
                  </Typography>
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
                </>
              )}
            </Box>
          </Menu>
          <Icon
            onClick={() => handleLogout()}
            sx={{ width: '40px', height: '40px', color: 'ludoGreenLight.main' }}
          >
            <Logout sx={{ fontSize: '40px' }} />
          </Icon>
        </div>
      ) : (
        <div className="headerLogin">
          <Link to={'/login'}>Iniciar Sesión</Link>
        </div>
      )}
    </AppBar>
  )
}

export default Header
