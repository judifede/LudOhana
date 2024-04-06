
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import './Login.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {
  EmailOutlined,
  LocationOn,
  LockOutlined,
  People,
  Person,
  VisibilityOutlined,
} from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { login,signup } from '../../Services/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [firstname,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')
  const [location,setLocation]=useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorName, setErrorName] = useState('');
  const [errorLastname, setErrorLastname] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState("")
  const [showLogin, setShowLogin] = useState(true); 

  const navigate = useNavigate()

  const handleEmailValidation = () => {
    if (!email ) {
      setErrorEmail('El email es requerido')
    } else if (!isValidEmail(email)) {
      setErrorEmail("Formato incorrecto "); 
     
    } else {
      setErrorEmail(""); 
    }
  };

  const handlePasswordValidation = () => {
    if (!password) {
      setErrorPassword("La contraseña es requerida");
    } else {
      setErrorPassword("");
      
    }
  };

  const handleNameValidation = () => {
    if (!firstname) {
      setErrorName('El nombre es requerido');
    } else {
      setErrorName('');
    }
  };

  const handleLastnameValidation = () => {
    if (!lastname) {
      setErrorLastname('Los apellidos son requeridos');
    } else {
      setErrorLastname('');
    }
  };


  const isValidEmail = (email)=>{
    const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
   return emailRegexp.test(email)

  }
 
  const onSignup = async ()=>{
    try {
      const res = await signup({firstname,lastname,location,email,password})
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/')
    } catch (error) {
       console.log("failed login")
    }
  }

  const onLogin = async () => {
    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/')
    } catch (error) {
    <>
      <Box>
        <Typography>Email o contraseña incorrectos</Typography>
      </Box>
    </>
    }
  }

  return (
    <Box className="container" sx={{ borderRadius: '10px' }}>
      <Card id="loginContainer" >
        <CardHeader title="Iniciar Sesión" sx={{ textAlign: 'center' }} />
        <CardContent >
          <TextField
          onChange={(e)=>setEmail(e.target.value)} 
            type="email"
            label="Email:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            placeholder={'diego@gmail.com'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <EmailOutlined />
                  </Icon>
                </InputAdornment>
              ),
            }}
            error={errorEmail} 
            helperText={errorEmail !== "" ? errorEmail : ''} 
            className={errorEmail ? 'error' : ''}
          ></TextField>

          <TextField
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            label="Contraseña:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            placeholder={'1234'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <LockOutlined />
                  </Icon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsPassVisible((oldState) => !oldState)
                    }}
                  >
                    {isPassVisible ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errorPassword} 
            helperText={errorPassword !== "" ? errorPassword : ''} 
            className={errorPassword ? 'error' : ''}
          ></TextField>
          <CardActions sx={{display:'flex', flexDirection:'column', marginTop:'40%'}}>

          <Button variant="text" size='small'
           onClick={()=>{
            setShowLogin(false)
              errorEmail !== "" ? setErrorEmail("") :setErrorEmail("") 
              errorPassword !== "" ? setErrorPassword("") : setErrorPassword("") 
          
           
          }}
          >¿Aún no tienes cuenta? Regístrate aquí.</Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => {
           
               handleEmailValidation() 
               handlePasswordValidation()
                onLogin()
              }}
            >
              Iniciar Sesión
            </Button>
          </CardActions>
        </CardContent>
      </Card>

      <Card id="registerContainer">
        <CardHeader title="Registro" sx={{ textAlign: 'center' }} />
        <CardContent >
          <TextField
           onChange={(e)=>{setFirstName(e.target.value)}}
            type="text"
            label="Nombre:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <Person />
                  </Icon>
                </InputAdornment>
              ),
            }}
            error={errorName} 
            helperText={errorName !== "" ? errorName : ''} 
            className={errorName ? 'error' : ''}
          ></TextField>
          <TextField
           onChange={(e)=>{setLastName(e.target.value)}}
            type="text"
            label="Apellidos:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <People />
                  </Icon>
                </InputAdornment>
              ),
            }}
            error={errorLastname} 
            helperText={errorLastname !== "" ? errorLastname : ''} 
            className={errorLastname ? 'error' : ''}
          ></TextField>
          <TextField
           onChange={(e)=>{setLocation(e.target.value)}}
            type="text"
            label="Ciudad:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <LocationOn />
                  </Icon>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
           onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            label="Email:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <EmailOutlined />
                  </Icon>
                </InputAdornment>
              ),
            }}
            error={errorEmail} 
            helperText={errorEmail !== "" ? errorEmail : ''} 
            className={errorEmail ? 'error' : ''}
          ></TextField>

          <TextField
           onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            label="Contraseña:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <LockOutlined />
                  </Icon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsPassVisible((oldState) => !oldState)
                    }}
                  >
                    {isPassVisible ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errorPassword} 
            helperText={errorPassword !== "" ? errorPassword : ''} 
            className={errorPassword ? 'error' : ''}
          ></TextField>
          <CardActions sx={{display:'flex', flexDirection:'column'}}>

          <Button variant="text" size='small'
           onClick={()=>{
            setShowLogin(true)
            errorEmail !== "" ? setErrorEmail("") :setErrorEmail("") 
            errorPassword !== "" ? setErrorPassword("") : setErrorPassword("") 
        
            }}>Iniciar Sesión</Button>

            <Button
              onClick={() => {
                handleNameValidation()
                handleLastnameValidation()
                handleEmailValidation()
               handlePasswordValidation()
                onSignup()
              }}
              size="large"
              color="primary"
              variant="contained"
             
            >
              Registro
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Box className={`image ${showLogin ? 'moveRight' : 'moveLeft'}`}></Box>
    </Box>
  )
}

export default Login
