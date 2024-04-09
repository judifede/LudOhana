import './EventDetails.css'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'
import { useParams } from 'react-router-dom'

import imageUrl from '../../assets/FiestadeBurbujas.webp'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getEventById, registerUserEvent } from '../../Services/eventService'
import { checkout } from '../../Services/contributionService'

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

  const [modalContribution, setModalContribution] = useState('')
  const [modalInscribe, setModalInscribe] = useState('')
  const [inscribed, setInscribed] = useState(1)
  const messageReq =
    events.contributionRequired &&
    `Este evento requiere una contribución de ${events.contributionRequired*inscribed}€. para poder llevarse a cabo. ¿Desea continuar con  la inscripción?`

  const messageOpt =
    'Contribuir con LudOhana, es totalmente opcional, nos ayudarías mucho para continuar con nuestra causa. ¿Deseas realizar una donación?'

  const messageCancelIns =
    'Has realizado una donación. Si desea recuperarla debe ponerse en contacto con ludohana.group@gmail.com. ¿Estás seguro de que quieres cancelar tu inscripción?'


  const handleContribution = async () => {
    setModalContribution('')
    const bodyObj = {
      name: events.title,
      description: events.description,
      amount: !events.contributionRequired>0 && 5,
      eventId: eventId,
      // user: JSON.parse(localStorage.getItem('profile')),
    }

    const data = await checkout(bodyObj)
    window.location.href = data.url
  }

  const handleInscribe = async () => {
    setModalInscribe('')

    const data = await registerUserEvent({ inscribed: inscribed }, eventId)
    console.log(data)

    setModalContribution('open')
  }

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
          alt={'Imagen del evento ' + events.title}
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

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textAlign: 'center',
              paddingBottom: '20px',
            }}
          >
            {events.description}
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
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  textAlign={'left'}
                >
                  Ahora necesitamos conocer cuántas personas (incluyéndote a ti)
                  se inscriben.
                </Typography>

                <TextField
                  type="number"
                  variant="outlined"
                  margin="dense"
                  onChange={(e) => {
                    setInscribed(e.target.value)
                  }}
                  placeholder="Número de inscritos"
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      handleInscribe()
                    }}
                  >
                    Continuar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setModalInscribe('')
                    }}
                  >
                    Volver
                  </Button>
                </Box>
              </Box>
            </Modal>
            <Modal
              open={modalContribution !== ''}
              onClose={() => {
                setModalContribution('')
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
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  textAlign={'left'}
                >
                  {events.isContributionRequired ? messageReq : messageOpt}
                </Typography>
                {events.isContributionRequired ?? (
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="dense"
                    placeholder="Cantidad a donar"
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      handleContribution()
                    }}
                  >
                    Si
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      events.isContributionRequired && handleContribution()
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
