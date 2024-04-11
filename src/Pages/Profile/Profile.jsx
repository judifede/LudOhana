import './Profile.css'
import { Grid, Modal, Typography } from '@mui/material'
import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'
import {
  AccountCircle,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { deleteUser, getUser, updateUser } from '../../Services/auth'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState({})
  const [modalDelete, setModalDelete] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const warningChangeEmail =
    'Si necesita realizar un cambio de correo electrónico, por favor, póngase en contacto con ludohana.group@gmail.com.'

  const handleGetUsers = async () => {
    const res = await getUser()
    setProfile(res)
    setIsLoading(false)

  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  const handleUpdateUsers = async (userData) => {
    const res = await updateUser(userData)
    if (res.message) {
      navigate('/')
    }
  }

  const handleDeleteUsers = async (userData) => {
    const res = await deleteUser(userData)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    if (res.message) {
      navigate('/')
    }
  }

  const [isPassVisible, setIsPassVisible] = useState(false)

  const handleProfile = (inputObj) => {
    const updatedProfile = { ...profile }
    const keys = Object.keys(inputObj)

    keys.forEach((key) => {
      updatedProfile[key] = inputObj[key]
    })
    setProfile(updatedProfile)
  }

  return (
    <Grid
      item
      sx={{ marginTop: '20px' }}
      xs={6}
      // sm={6} md={3} lg={3} xl={2.4}
    >
      {isLoading && (
        <CircularProgress />
      )}
      <Card
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'visible',
          paddingTop: '50px',
        }}
      >
        <AccountCircle className="profileImg" sx={{ fontSize: '100px' }} />
        <CardContent>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <TextField
              label="Nombre"
              onChange={(e) => {
                handleProfile({ name: e.target.value })
              }}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={profile.name}
              type="text"
              fullWidth={true}
            ></TextField>
            <TextField
              label="Apellido"
              onChange={(e) => {
                handleProfile({ lastName: e.target.value })
              }}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={profile.lastName}
              type="text"
              fullWidth={true}
            ></TextField>
          </Box>

          <TextField
            label="Password"
            onChange={(e) => {
              handleProfile({ password: e.target.value })
            }}
            variant="outlined"
            type={isPassVisible ? 'text' : 'password'}
            margin="normal"
            fullWidth={true}
            InputProps={{
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
          ></TextField>
          {profile.description && (
            <TextField
              label="Descripción"
              onChange={(e) => {
                handleProfile({ description: e.target.value })
              }}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={profile.description}
              type="text"
              fullWidth={true}
            ></TextField>
          )}
          {profile.address && (
            <TextField
              label="Dirección"
              onChange={(e) => {
                handleProfile({ address: e.target.value })
              }}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={profile.address}
              type="text"
              fullWidth={true}
            ></TextField>
          )}
          <Typography
            id="warning-email"
            variant="subtitle2"
            component="p"
            sx={{ marginTop: '16px', fontWeight: '400' }}
          >
            {warningChangeEmail}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ width: '100%', justifyContent: 'right', pb: 4, gap:'10px',pr:9 }}
        >
          <Button
            onClick={() => {
              handleUpdateUsers(profile)
            }}
            variant="contained"
            color="success"
          >
            Guardar
          </Button>
          <Button
            onClick={() => {
              setModalDelete('open')
            }}
            variant="contained"
            color="error"
          >
            Eliminar
          </Button>
          <Modal
            open={modalDelete !== ''}
            onClose={() => {
              setModalDelete('')
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
                p: 4,
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2">
                ¿Estás seguro de que deseas eliminar tu cuenta?
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'right', gap:'20px'  }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setModalDelete('')
                  }}
                >
                  Volver
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setModalDelete('')
                    handleDeleteUsers()
                  }}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          </Modal>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Profile
