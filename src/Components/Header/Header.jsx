import { AppBar, Icon } from '@mui/material'
import { Link } from 'react-router-dom'
import './Header.css'

import { AccountCircle, Logout } from '@mui/icons-material'

function Header() {
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
        <Link to='/'>Inicio</Link>
        <Link to='/events'>Eventos</Link>
        <Link to='/settings'>Ajustes</Link>
      </div>
      <div className="headerLogin">
        <Link to='/login'>Iniciar Sesión</Link>
        <Icon
          sx={{ width: '40px', height: '40px', color: 'ludoGreenLight.main' }}
        >
          <Link to="/profile">
            <AccountCircle sx={{ fontSize: '40px' }} />
          </Link>
        </Icon>
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
