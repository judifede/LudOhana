import './EventDetails.css'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'
import { useParams } from 'react-router-dom'

import imageUrl from '../../assets/FiestadeBurbujas.webp'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getEventById } from '../../Services/eventService'

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

const EventDetails = () => {
  const [events, setEvents] = useState([])
  const { eventId } = useParams()

  const messageReq =
    events.contributionRequired &&
    `Este evento requiere una contribución de ${events.contributionRequired}€. para poder llevarse a cabo. ¿Desea continuar con  la inscripción?`

  const messageOpt =
    'Contribuir con LudOhana, es totalmente opcional, nos ayudarías mucho para continuar con nuestra causa. ¿Deseas realizar una donación?'

  const messageCancelIns =
    'Has realizado una donación. Si desea recuperarla debe ponerse en contacto con ludohana.group@gmail.com. ¿Estás seguro de que quieres cancelar tu inscripción?'

  const [modalInscribe, setModalInscribe] = useState('')

  const handleInscribe = () => {}

  useEffect(() => {
    const handleEvent = async () => {
      try {
        const eventsData = await getEventById(eventId)
        setEvents(eventsData)
      } catch (error) {
        console.error('Error al obtener eventos:', error)
      }
    }

    handleEvent()
  }, [eventId])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <Card
        sx={{ minHeight: '400px' }}
        className="eventDetailCard"
        elevation={4}
      >
        <CardMedia
          className="eventDetailImg"
          component="img"
          height="auto"
          image={imageUrl}
          alt={events.title}
        />
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
            {events.title}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CalendarMonth />

              <Typography variant="body1" color="text.main">
                <strong>Inicio:</strong> {formatDate(events.dateStart)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CalendarMonth />
              <Typography variant="body1" color="text.main">
                <strong>Fin:</strong> {formatDate(events.dateEnd)}
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
                  to={events.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FF8000', textDecoration: 'underline' }}
                >
                  <Typography variant="body2" color="text.main">
                    {events.addressTitle}
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Groups />
                <Typography variant="body2" color="text.main">
                  <strong>Participantes:</strong>
                  {events.participants}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'center',
            paddingBottom: '20px',
            marginTop: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'auto',
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setModalInscribe('open')
              }}
            >
              Inscribirse
            </Button>

            <Modal
              open={modalInscribe !== ''}
              onClose={() => {
                setModalInscribe('')
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
                  {events.isContributionRequired ? messageReq : messageOpt}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      handleInscribe()
                      setModalInscribe('')
                    }}
                  >
                    Si
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setModalInscribe('')
                    }}
                  >
                    No
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

export default EventDetails
