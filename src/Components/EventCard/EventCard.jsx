import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'

import imageUrl from '../../assets/FiestadeBurbujas.webp'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  const fecha = new Date(date)
  return fecha.toLocaleString('es-ES', options) + 'h'
}

const EventCard = ({
  event: { id, title, dateStart, dateEnd, addressTitle, addressURL, participants },
}) => {
  return (
    <Box
      className={'cardHover'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <Card sx={{ maxwidth: '100%', width: '400px' }} elevation={4}>
        <CardMedia component="img" height="auto" image={imageUrl} alt={"Imagen del evento " + title} />
        <CardContent sx={{ padding: '20px', paddingBottom: '0' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              paddingBottom: '20px',
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CalendarMonth />

              <Typography variant="body1" color="text.main">
                <strong>Inicio:</strong> {formatDate(dateStart)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CalendarMonth />
              <Typography variant="body1" color="text.main">
                <strong>Fin:</strong> {formatDate(dateEnd)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LocationOn />
                <Link
                  to={addressURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FF8000', textDecoration: 'underline' }}
                >
                  <Typography variant="body2" color="text.main">
                    {addressTitle}
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Groups />
                <Typography variant="body2" color="text.main">
                  <strong>Participantes:</strong>
                  {participants}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'auto',
            }}
          >
            <Button variant="contained" color="success" href={'events/'+id}>
              Info
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

EventCard.propTypes = {
  event: PropTypes.object,
  id: PropTypes.number,
  title: PropTypes.string,
  dateStart: PropTypes.date,
  dateEnd: PropTypes.date,
  addressTitle: PropTypes.string,
  addressURL: PropTypes.string,
  participants: PropTypes.number,
}

export default EventCard