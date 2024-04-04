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
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleEmailValidation = ()=>{
    if(!email){
      setErrorMessage("El email es requerido")
    }else if(!isValidEmail){
      setErrorMessage("El email no es valido")
    }else{
      setErrorMessage("")
    }
  }
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
        <CardContent className="">
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
          ></TextField>
          <CardActions sx={{display:'flex', flexDirection:'column', marginTop:'40%'}}>

          <Button variant="text" size='small'>¿Aún no tienes cuenta? Regístrate aquí.</Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => {
                handleEmailValidation()
                onLogin()
              }}
            >
              Iniciar Sesión
            </Button>
          </CardActions>
        </CardContent>
      </Card>

      <Card id="registerContainer" >
        <CardHeader title="Registro" sx={{ textAlign: 'center' }} />
        <CardContent className="">
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
          ></TextField>
          <CardActions sx={{display:'flex', flexDirection:'column'}}>

          <Button variant="text" size='small'>Iniciar Sesión</Button>

            <Button
              onClick={() => {
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
    </Box>
  )
}

export default Login
