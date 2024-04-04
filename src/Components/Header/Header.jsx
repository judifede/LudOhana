import { AppBar, Icon } from '@mui/material'
import { Link,useNavigate} from 'react-router-dom'
import './Header.css'

import { AccountCircle, Logout } from '@mui/icons-material'

function Header() {

  const navigate= useNavigate()
  const handleLogout = ()=>{

      localStorage.removeItem('token')
      localStorage.removeItem('rol')

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
        <Link to={'/'}>Inicio</Link>
        <Link to={'/events'}>Eventos</Link>
        <Link to={'/settings'}>Ajustes</Link>
      </div>

      {localStorage.getItem('token')?
          <div className="headerLogin">
          <Icon sx={{ width: '40px', height: '40px', color: "ludoGreenLight.main" }}>
          <AccountCircle sx={{ fontSize: '40px' }} />
        </Icon>
        <Icon onClick={()=>handleLogout()}
          sx={{ width: '40px', height: '40px', color: "ludoGreenLight.main" }}
        >
          <Logout sx={{ fontSize: '40px' }} />
        </Icon>
          </div>
          :
      <div className="headerLogin">
        <Link to={'/login'}>Iniciar Sesión</Link>
       
      </div>
    }
    </AppBar>
  )
}

export default Header
