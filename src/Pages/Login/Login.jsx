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
  Modal,
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
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'
import { useContext, useState } from 'react'
import { login, signup, getUser } from '../../Services/auth'

import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../../context/context'

function Login() {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorLastname, setErrorLastname] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [registrationError, setRegistrationError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showLogin, setShowLogin] = useState('')
  const { setIsMenuOpen } = useContext(MenuContext)

  const moveLeft = 'moveLeft'
  const moveRight = 'moveRight'
  const navigate = useNavigate()

  const handleEmailValidation = () => {
    if (!email) {
      setErrorEmail('El email es requerido')
    } else if (!isValidEmail(email)) {
      setErrorEmail('Formato incorrecto ')
    } else {
      setErrorEmail('')
    }
  }

  const handlePasswordValidation = () => {
    if (!password) {
      setErrorPassword('La contraseña es requerida')
    } else {
      setErrorPassword('')
    }
  }

  const handleNameValidation = () => {
    if (!firstname) {
      setErrorName('El nombre es requerido')
    } else {
      setErrorName('')
    }
  }

  const handleLastnameValidation = () => {
    if (!lastname) {
      setErrorLastname('Los apellidos son requeridos')
    } else {
      setErrorLastname('')
    }
  }

  const isValidEmail = (email) => {
    const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
    return emailRegexp.test(email)
  }

  const onSignup = async () => {
    try {
      const res = await signup({
        name: firstname,
        lastName: lastname,
        address: location,
        email,
        password,
      })
      console.log('Hola una vez')

      onLocalStorage(res)
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setRegistrationError('El email ya está registrado.')
      } else {
        setRegistrationError('Error en el registro. Inténtalo de nuevo.')
      }
    }
  }

  const onLogin = async () => {
    try {
      const res = await login({ email, password })

      onLocalStorage(res)
    } catch (error) {
      setLoginError('El email o la contraseña no son correctos')
    }
  }

  const handleGetUsers = async () => {
    const res = await getUser()
    console.log(res)
    const { id, name, lastName, email } = res
    const profile = { id, name, lastName, email }
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  const onLocalStorage = async (res) => {
    localStorage.setItem('token', res.token)
    localStorage.setItem('role', res.role)
    setIsMenuOpen(null)
    await handleGetUsers()
    navigate('/')
  }

  return (
    <Box className="container" sx={{ borderRadius: '10px' }}>
      <Card id="loginContainer">
        <CardHeader
          titleTypographyProps={{ fontWeight: '500', color: 'texts.main' }}
          title="Iniciar Sesión"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        />
        <CardContent>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            placeholder={''}
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
            helperText={errorEmail !== '' ? errorEmail : ''}
            className={errorEmail ? 'error' : ''}
          ></TextField>

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type={isPassVisible ? 'text' : 'password'}
            label="Contraseña:"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            placeholder={''}
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
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errorPassword}
            helperText={errorPassword !== '' ? errorPassword : ''}
            className={errorPassword ? 'error' : ''}
          ></TextField>
          <CardActions
            sx={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}
          >
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setShowLogin(moveLeft)
                errorEmail !== '' ? setErrorEmail('') : setErrorEmail('')
                errorPassword !== ''
                  ? setErrorPassword('')
                  : setErrorPassword('')
              }}
            >
              ¿Aún no tienes cuenta? Regístrate aquí.
            </Button>
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
        <CardHeader
          title="Registro"
          titleTypographyProps={{ fontWeight: '500', color: 'texts.main' }}
          sx={{
            textAlign: 'center',
            marginTop: '5%',
          }}
        />
        <CardContent>
          <TextField
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
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
            helperText={errorName !== '' ? errorName : ''}
            className={errorName ? 'error' : ''}
          ></TextField>
          <TextField
            onChange={(e) => {
              setLastName(e.target.value)
            }}
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
            helperText={errorLastname !== '' ? errorLastname : ''}
            className={errorLastname ? 'error' : ''}
          ></TextField>
          <TextField
            onChange={(e) => {
              setLocation(e.target.value)
            }}
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
            onChange={(e) => {
              setEmail(e.target.value)
            }}
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
            helperText={errorEmail !== '' ? errorEmail : ''}
            className={errorEmail ? 'error' : ''}
          ></TextField>

          <TextField
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type={isPassVisible ? 'text' : 'password'}
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
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errorPassword}
            helperText={errorPassword !== '' ? errorPassword : ''}
            className={errorPassword ? 'error' : ''}
          ></TextField>
          <CardActions
            sx={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}
          >
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setShowLogin(moveRight)
                errorEmail !== '' ? setErrorEmail('') : setErrorEmail('')
                errorPassword !== ''
                  ? setErrorPassword('')
                  : setErrorPassword('')
              }}
            >
              Iniciar Sesión
            </Button>

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
      <Box className={`image ${showLogin}`}></Box>
      <Modal
        open={registrationError !== ''}
        onClose={() => {
          setRegistrationError('')
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            sx={{ textAlign: 'left' }}
            variant="h6"
            component="h2"
          >
            Error de Registro
          </Typography>
          <Typography id="modal-description" sx={{ textAlign: 'left', mt: 2 }}>
            {registrationError}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              setRegistrationError('')
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      <Modal
        open={loginError !== ''}
        onClose={() => {
          setLoginError('')
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            sx={{ textAlign: 'left' }}
            variant="h6"
            component="h2"
          >
            Error de Registro
          </Typography>
          <Typography id="modal-description" sx={{ textAlign: 'left', mt: 2 }}>
            {loginError}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              setLoginError('')
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Login
