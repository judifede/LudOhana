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
  event: {
    id,
    title,
    dateStart,
    dateEnd,
    addressTitle,
    addressURL,
    participants,
  },
}) => {
  return (
    <Box
      className={'cardHover'}
      sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', p: 3 }}
    >
      <Card
        sx={{ maxWidth: '450px', maxHeight: '100%', minHeight: '500px' }}
        elevation={4}
      >
        <CardMedia component="img" image={imageUrl} alt={title} />
        <CardContent sx={{ p: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', textAlign: 'center', pb: 1 }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarMonth />

              <Typography variant="body1" color="text.main">
                <strong>Inicio:</strong> {formatDate(dateStart)}
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pb: 1 }}
            >
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
                minHeight: '50px',
                gap: '15px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOn />
                <Link
                  to={addressURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FF8000', textDecoration: 'underline' }}
                >
                  <Typography
                    variant="body1"
                    color="text.main"
                  >
                    {addressTitle}
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Groups />
                <Typography variant="body1" color="text.main">
                  <strong>Participantes:</strong>
                  {participants}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.1 , pb: 2}}>
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
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  addressTitle: PropTypes.string,
  addressURL: PropTypes.string,
  participants: PropTypes.number,
}

export default EventCard
