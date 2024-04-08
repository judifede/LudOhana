import './Profile.css'
import { Grid } from '@mui/material'
import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
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

  const handleGetUsers = async () => {
    const res = await getUser()
    setProfile(res)
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
            label="Email"
            onChange={(e) => {
              handleProfile({ email: e.target.value })
            }}
            margin="normal"
            placeholder="ludohana.group@gmail.com"
            InputLabelProps={{ shrink: true }}
            value={profile.email}
            type="email"
            fullWidth={true}
          ></TextField>
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
        </CardContent>
        <CardActions sx={{ width: '100%', justifyContent: 'space-around' }}>
          <Button
            onClick={() => {
              handleUpdateUsers(profile)
            }}
            variant="contained"
            color="success"
          >
            Guardar
          </Button>
          <Button onClick={() => {
              handleDeleteUsers()
            }}
            variant="contained" color="error">
            Eliminar cuenta
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Profile
