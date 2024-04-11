import { AppBar, Icon, Menu, MenuItem, Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

import {
  AccountCircle,
  Edit,
  Logout,
  EmailOutlined,
  Settings,
} from '@mui/icons-material'
import { useContext, useState } from 'react'

import logoURL from '../../assets/logo_letras_fdfffd.webp'
import { MenuContext } from '../../context/context'

function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext)
  const profile =
    localStorage.getItem('profile') &&
    JSON.parse(localStorage.getItem('profile'))

  const handleClick = (event) => {
    setIsMenuOpen(true)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setIsMenuOpen(false)
    setAnchorEl(null)
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
      </div>

      {localStorage.getItem('token') ? (
        <div className="headerLogin">
          <Icon
            onClick={(e) => {
              handleClick(e)
            }}
            sx={{
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              color: 'ludoGreenLight.main',
            }}
          >
            <AccountCircle sx={{ fontSize: '40px' }} />
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
            <Box
              sx={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <Icon
                sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'texts.main',
                }}
              >
                <EmailOutlined sx={{ fontSize: '30px' }} />
              </Icon>
              <Typography sx={{ color: 'texts.main' }}>
                {localStorage.getItem('profile') && profile.email}
              </Typography>
            </Box>
            <MenuItem>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'texts.main',
                }}
                onClick={() => {
                  handleClose()
                }}
              >
                <Icon sx={{ width: '40px', height: '40px', textAlign: 'left' }}>
                  <Edit sx={{ fontSize: '30px' }} />
                </Icon>
                Editar
              </Link>
            </MenuItem>
            {localStorage.getItem('role') === 'admin' && (
              <MenuItem>
                <Link
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'texts.main',
                  }}
                  to="/settings"
                >
                  <Icon
                    sx={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'texts.main',
                    }}
                  >
                    <Settings sx={{ fontSize: '30px' }} />
                  </Icon>
                  Ajustes
                </Link>
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                handleLogout()
              }}
              sx={{ color: 'texts.main' }}
            >
              <Icon
                sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'texts.main',
                }}
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
