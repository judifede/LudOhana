import React from 'react'
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
  LockOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { login,signup } from '../../Services/auth'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [firstname,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')
  const [location,setLocation]=useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [errorName, setErrorName] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [showLogin, setShowLogin] = useState(true); 

  const navigate = useNavigate()

  const handleEmailValidation = () => {
    if (!email ) {
      setErrorEmail(true);
      setErrorMessage('El campo es requerido');
    } else if (!isValidEmail(email)) {
      setErrorEmail(true); 
      setErrorMessage('El email no es válido');
    } else {
      setErrorEmail(false); 
      setErrorMessage('');
    }
  };

  const handlePasswordValidation = () => {
    if (!password) {
      setErrorPassword(true);
      setErrorMessage('La contraseña es requerida');
    } else {
      setErrorPassword(false);
      setErrorMessage('');
    }
  };

  const handleNameValidation = () => {
    if (!firstname) {
      setErrorName(true);
      setErrorMessage('El nombre es requerido');
    } else {
      setErrorName(false);
      setErrorMessage('');
    }
  };

  const handleLastnameValidation = () => {
    if (!lastname) {
      setErrorLastname(true);
      setErrorMessage('Los apellidos son requeridos');
    } else {
      setErrorLastname(false);
      setErrorMessage('');
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
      setErrorMessage('Register failed')
    }
  }

  const onLogin = async () => {
    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/')
    } catch (error) {
      setErrorMessage('Login failed')
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
            helperText={errorEmail ? errorMessage : ''} 
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
            helperText={errorPassword ? errorMessage : ''} 
            className={errorPassword ? 'error' : ''}
          ></TextField>
          <CardActions sx={{display:'flex', flexDirection:'column', marginTop:'40%'}}>

          <Button variant="text" size='small'
           onClick={()=>{
            setShowLogin(false)
        
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
                    <EmailOutlined />
                  </Icon>
                </InputAdornment>
              ),
            }}
            error={errorName} 
            helperText={errorName ? errorMessage : ''} 
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
                    <EmailOutlined />
                  </Icon>
                </InputAdornment>
              ),
            }}
            error={errorLastname} 
            helperText={errorLastname ? errorMessage : ''} 
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
                    <EmailOutlined />
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
            helperText={errorEmail ? errorMessage : ''} 
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
            helperText={errorPassword ? errorMessage : ''} 
            className={errorPassword ? 'error' : ''}
          ></TextField>
          <CardActions sx={{display:'flex', flexDirection:'column'}}>

          <Button variant="text" size='small'
           onClick={()=>{setShowLogin(true)}}>Iniciar Sesión</Button>

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
