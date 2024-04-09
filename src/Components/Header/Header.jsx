import {
  AppBar,
  Icon,
  Menu,
  MenuItem,
  Box,
  Button,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const handleLogout = () => {
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
      <img src="src/assets/logo_letras_fdfffd.webp" alt="Logo Ludohana" />
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
            sx={{
              top: '15px',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
                {/* <Typography>{profile.name + ' ' + profile.lastname}</Typography> */}
                <Typography sx={{textAlign: "center", py: 1}}>{profile.email}</Typography>
            <MenuItem>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => {
                  handleClose()
                }}
              >
                {/* <Button
                  startIcon={<Edit />}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Editar
                </Button> */}
                <Icon
                  onClick={() => handleLogout()}
                  // color='success'
                  sx={{ width: '40px', height: '40px' }}
                >
                  <Edit sx={{ fontSize: '30px' }} />
                </Icon>
                Editar
              </Link>
            </MenuItem>
            <MenuItem sx={{
                 
                }}>
              <Icon
                onClick={() => handleLogout()}
                // color='success'
                sx={{ width: '40px', height: '40px',  display: 'flex',
                alignItems: 'center', }}
              >
                <Logout sx={{ fontSize: '30px' }} />
              </Icon>
              Cerrar sesión
            </MenuItem>
          </Menu>
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
