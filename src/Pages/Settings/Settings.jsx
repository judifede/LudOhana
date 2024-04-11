import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  Icon,
  Grid,
} from '@mui/material'
import {
  Construction,
  // VolunteerActivism,
  CalendarMonth,
} from '@mui/icons-material'
import './Settings.css'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const navigate = useNavigate()
  return (
    <Grid
      item
      sx={{ marginTop: '20px' }}
      xs={12}
      // sm={6} md={3} lg={3} xl={2.4}
    >
      <Typography
        id="modal-title"
        variant="h3"
        component="h2"
        textAlign="center"
      >
        Panel De Gestión
      </Typography>

      <Box className="options">
        <Card
          elevation={4}
          className="section cardHover"
          onClick={() => navigate('materials')}
        >
          <CardHeader
            title="Materiales"
            sx={{ textAlign: 'center', padding: '0' }}
          />
          <CardContent>
            <InputAdornment
              position="start"
              sx={{ width: '100%', height: '90%', marginTop: '25%' }}
            >
              <Icon sx={{ width: '100%', height: '50%', marginTop: '10%' }}>
                <Construction sx={{ fontSize: '100px' }} />
              </Icon>
            </InputAdornment>
          </CardContent>
        </Card>

        <Card
          elevation={4}
          className="section cardHover"
          onClick={() => navigate('events')}
        >
          <CardHeader
            title="Eventos"
            sx={{ textAlign: 'center', padding: '0' }}
          />
          <CardContent>
            <InputAdornment
              position="start"
              sx={{ width: '100%', height: '90%', marginTop: '25%' }}
            >
              <Icon sx={{ width: '100%', height: '50%', marginTop: '10%' }}>
                <CalendarMonth sx={{ fontSize: '100px' }} />
              </Icon>
            </InputAdornment>
          </CardContent>
        </Card>
        
        {/* <Card elevation={4} className="section cardHover">
          <CardHeader
            title="Donaciones"
            sx={{ textAlign: 'center', padding: '0' }}
          />
          <CardContent>
            <InputAdornment
              position="start"
              sx={{ width: '100%', height: '90%', marginTop: '25%' }}
            >
              <Icon sx={{ width: '100%', height: '50%', marginTop: '10%' }}>
                <VolunteerActivism sx={{ fontSize: '100px' }} />
              </Icon>
            </InputAdornment>
          </CardContent>
        </Card> */}
      </Box>
    </Grid>
  )
}

export default Settings
