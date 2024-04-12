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
  CircularProgress,
} from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import imageUrl from '../../assets/FiestadeBurbujas.webp'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  deleteUserEvent,
  getEventById,
  getEventContributions,
  getUserEvents,
  registerUserEvent,
} from '../../Services/eventService'
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
  const [event, setEvent] = useState([])
  const { eventId } = useParams()

  const [modalContribution, setModalContribution] = useState('')
  const [modalInscribe, setModalInscribe] = useState('')
  const [modalCancelInscribe, setModalCancelInscribe] = useState('')
  const [inscribed, setInscribed] = useState(1)
  const [amountInput, setAmountInput] = useState(5)
  const [userEvents, setUserEvents] = useState([])
  const [eventContribution, setEventContribution] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isUserInscribed, setIsUserInscribed] = useState()

  const messageReq =
    event.contributionRequired &&
    `Este evento requiere una contribución de ${
      event.contributionRequired * inscribed
    }€. para poder llevarse a cabo. ¿Desea continuar con  la inscripción?`

  const messageOpt =
    'Contribuir con LudOhana, es totalmente opcional, nos ayudarías mucho para continuar con nuestra causa. ¿Deseas realizar una donación?'

  const messageOnIns =
    'Ahora necesitamos conocer cuántas personas (incluyéndote a ti) se inscriben.'
  const messageCancelIns =
    '¿Estás seguro de que quieres cancelar tu inscripción?'
  const warningCancelIns =
    'Si desea recuperar su donación debe ponerse en contacto con ludohana.group@gmail.com.'

  const handleInscribe = async () => {
    setModalInscribe('')

    await registerUserEvent({ inscribed: inscribed }, eventId)

    setIsUserInscribed(true)

    setModalContribution('open')
  }
  const handleContribution = async () => {
    setModalContribution('')
    const bodyObj = {
      name: event.title,
      description: event.description,
      amount:
        event.contributionRequired > 0
          ? event.contributionRequired
          : amountInput,
      eventId: eventId,
      user: JSON.parse(localStorage.getItem('profile')),
    }

    const data = await checkout(bodyObj)
    window.location.href = data.url
  }

  const handleCancelInscribe = async () => {
    setModalCancelInscribe('')

    await deleteUserEvent(eventId)

    setIsUserInscribed(false)
  }

  useEffect(() => {
    const handleEvent = async () => {
      try {
        const eventData = await getEventById(eventId)
        setEvent(eventData)
        setIsLoading(false)
        if (!localStorage.getItem('token')) return null
        const eventContributionData = await getEventContributions(eventId)
        const contributions = eventContributionData.contributions.reduce(
          (prev, curr) => {
            return prev + curr.amount
          },
          0
        )
        setEventContribution(contributions)
      } catch (error) {
        // console.error('Error al obtener eventos:', error.message)
      }
    }

    handleEvent()
  }, [eventId])

  useEffect(() => {
    const handleInscribedEvent = async () => {
      try {
        const eventData = await getUserEvents()
        if (!eventData.messageError) setUserEvents(eventData)
      } catch (error) {
        console.error('Error al obtener eventos:', error.message)
      }
    }

    handleInscribedEvent()
  }, [])

  useEffect(() => {
    const handleIsUserInscribed = () => {
      if (userEvents) {
        const isUserEvent = userEvents.some((userEvent) => {
          return eventId == userEvent.id
        })

        setIsUserInscribed(isUserEvent)
      }
    }

    handleIsUserInscribed()
  }, [eventId, userEvents])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '850px',
        padding: '30px',
      }}
    >
      {isLoading && (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      )}
      <Card
        sx={{ minHeight: '400px', position: 'relative' }}
        className="eventDetailCard"
        elevation={4}
      >
        <Link to={'/events'}>
          <ArrowBackIosNewIcon
            sx={{
              fontSize: '35px',
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: 0,
            }}
          />
        </Link>

        <CardMedia
          className="eventDetailImg"
          component="img"
          sx={{ width: '40%' }}
          image={imageUrl}
          alt={'Imagen del evento ' + event.title}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
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
              {event.title}
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
              {event.description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarMonth />

                <Typography variant="body1" color="text.main">
                  <strong>Inicio:</strong> {formatDate(event.dateStart)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarMonth />
                <Typography variant="body1" color="text.main">
                  <strong>Fin:</strong> {formatDate(event.dateEnd)}
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
                    to={event.addressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#FF8000', textDecoration: 'underline' }}
                  >
                    <Typography variant="body2" color="text.main">
                      {event.addressTitle}
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Groups />
                  <Typography
                    sx={{ display: 'flex', gap: 0.5 }}
                    variant="body2"
                    color="text.main"
                  >
                    <strong>Participantes:</strong>
                    {event.participants}
                  </Typography>
                </Box>
              </Box>
              {localStorage.getItem('role') === 'admin' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Groups />
                  <Typography
                    sx={{ display: 'flex', gap: 0.5 }}
                    variant="body2"
                    color="text.main"
                  >
                    <strong>Contribuciones:</strong>
                    {eventContribution}
                  </Typography>
                </Box>
              )}
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
              {localStorage.getItem('token') && (
                <Button
                  variant="contained"
                  color={isUserInscribed ? 'error' : 'success'}
                  onClick={() => {
                    isUserInscribed
                      ? setModalCancelInscribe('open')
                      : setModalInscribe('open')
                  }}
                >
                  {isUserInscribed ? 'Cancelar inscripción' : 'Inscribirse'}
                </Button>
              )}

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
                    {messageOnIns}
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

                  <Box
                    sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}
                  >
                    <Button
                      variant="text"
                      color="error"
                      sx={{
                        mt: 2,
                        textDecoration: 'underline',
                        textUnderlineOffset: '6px',
                      }}
                      onClick={() => {
                        setModalInscribe('')
                      }}
                    >
                      Volver
                    </Button>
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
                  </Box>
                </Box>
              </Modal>

              <Modal
                open={modalCancelInscribe !== ''}
                onClose={() => {
                  setModalCancelInscribe('')
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
                    {messageCancelIns}
                  </Typography>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}
                  >
                    <Button
                      variant="text"
                      color="success"
                      sx={{
                        mt: 2,
                        textDecoration: 'underline',
                        textUnderlineOffset: '6px',
                      }}
                      onClick={() => {
                        handleCancelInscribe()
                      }}
                    >
                      Volver
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setModalCancelInscribe('')
                      }}
                    >
                      Cancelar Inscripción
                    </Button>
                  </Box>
                  <Typography
                    id="modal-warning"
                    variant="subtitle2"
                    component="p"
                    sx={{ marginTop: '16px' }}
                    textAlign={'left'}
                  >
                    {warningCancelIns}
                  </Typography>
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
                    {event.isContributionRequired ? messageReq : messageOpt}
                  </Typography>
                  {event.isContributionRequired || (
                    <TextField
                      type="number"
                      variant="outlined"
                      margin="dense"
                      onChange={(e) => {
                        setAmountInput(e.target.value)
                      }}
                      placeholder="Cantidad a donar"
                    />
                  )}
                  <Box
                    sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}
                  >
                    <Button
                      variant="text"
                      color="error"
                      sx={{
                        mt: 2,
                        textDecoration: 'underline',
                        textUnderlineOffset: '6px',
                      }}
                      onClick={() => {
                        setModalContribution('')
                      }}
                    >
                      No
                    </Button>
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
                  </Box>
                </Box>
              </Modal>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  )
}

export default EventDetails
