import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Modal,
} from '@mui/material'
import { CalendarMonth, Groups, LocationOn, Cancel } from '@mui/icons-material'

import imageUrl1 from '../../assets/events/1.webp'
import imageUrl2 from '../../assets/events/2.webp'
import imageUrl3 from '../../assets/events/3.webp'
import imageUrl4 from '../../assets/events/4.webp'
import imageUrl5 from '../../assets/events/5.webp'
import imageUrl6 from '../../assets/events/6.webp'
import imageUrl7 from '../../assets/events/7.webp'
import imageUrl8 from '../../assets/events/8.webp'
import imageUrl9 from '../../assets/events/9.webp'
import imageUrl10 from '../../assets/events/10.webp'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteEvent } from '../../Services/eventService'
import { useState } from 'react'

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
  setRefresh,
}) => {
  const [modalDeleteEvent, setModalDeleteEvent] = useState('')

  const messageDeleteEvent = '¿Estás seguro de que quieres borrar el evento?'

  const imageUrlObj = {
    1: imageUrl1,
    2: imageUrl2,
    3: imageUrl3,
    4: imageUrl4,
    5: imageUrl5,
    6: imageUrl6,
    7: imageUrl7,
    8: imageUrl8,
    9: imageUrl9,
    10: imageUrl10,
  }

  const handleDeleteEvent = async () => {
    await deleteEvent(id)
    setModalDeleteEvent('')
    setRefresh(true)
  }

  return (
    <Box
      className={'cardHover'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        p: 3,
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {localStorage.getItem('role') === 'admin' && (
        <Cancel
          sx={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            borderRadius: '50%',
            cursor: 'pointer',
            backgroundColor: 'ludoGreenLight.main',
            zIndex: '200',
          }}
          onClick={() => setModalDeleteEvent('open')}
          color="error"
        />
      )}
      <Card
        sx={{
          position: 'relative',
          overflow: 'visible',
          maxWidth: '450px',
          maxHeight: '100%',
          minHeight: '500px',
        }}
        elevation={4}
      >
        <Link to={'/events/' + id}>
          <CardMedia
            component="img"
            image={imageUrlObj[id]}
            alt={title}
            sx={{ aspectRatio: '3/2' }}
          />
        </Link>

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
                  <Typography variant="body1" color="text.main">
                    {addressTitle}
                  </Typography>
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Groups />
                <Typography
                  sx={{ display: 'flex', gap: 0.5 }}
                  variant="body1"
                  color="text.main"
                >
                  <strong>Participantes:</strong>
                  {participants}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '10px',
            pb: 3,
            pr: 3,
          }}
        >
          <Button variant="contained" color="success" href={'/events/' + id}>
            Info
          </Button>
          {localStorage.getItem('role') === 'admin' && (
            <Button
              variant="contained"
              color="warning"
              href={'/form-event/' + id}
            >
              Editar
            </Button>
          )}
        </CardActions>
      </Card>
      <Modal
        open={modalDeleteEvent !== ''}
        onClose={() => {
          setModalDeleteEvent('')
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
            {messageDeleteEvent}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
            <Button
              variant="text"
              color="success"
              sx={{
                mt: 2,
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              }}
              onClick={() => {
                setModalDeleteEvent('')
              }}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => {
                handleDeleteEvent()
              }}
            >
              Borrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

EventCard.propTypes = {
  event: PropTypes.object,
  setRefresh: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  addressTitle: PropTypes.string,
  addressURL: PropTypes.string,
  participants: PropTypes.number,
}

export default EventCard
