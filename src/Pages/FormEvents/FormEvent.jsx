import { useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import {
  createEvent,
  getEventById,
  updateEvent,
} from '../../Services/eventService'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es'

const formatDate = (date) => {
  const formattedDate = new Date(date)
  const year = formattedDate.getFullYear()
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0')
  const day = String(formattedDate.getDate()).padStart(2, '0')
  const hours = String(formattedDate.getHours()).padStart(2, '0')
  const minutes = String(formattedDate.getMinutes()).padStart(2, '0')
  const seconds = String(formattedDate.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const FormEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    addressTitle: '',
    dateStart: '',
    dateEnd: '',
    addressURL: '',
    participants: '',
    imageUrl: '',
    isContributionRequired: '',
    contributionRequired: '',
  })

  const [dateStart, setStartDate] = useState(null)
  const [dateEnd, setEndDate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { eventId } = useParams()

  const navigate = useNavigate()

  const handleChange = (event) => {
    const updatedFormData = { ...formData }
    updatedFormData[event.target.name] = event.target.value
    if (formData.contributionRequired > 0) {
      updatedFormData['isContributionRequired'] = true
    }

    setFormData(updatedFormData)
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    const formattedDate = formatDate(date)
    setFormData((prevState) => ({
      ...prevState,
      dateStart: formattedDate,
    }))
  }

  const handleEndDataChange = (date) => {
    setEndDate(date)
    const formattedDate = formatDate(date)
    setFormData((prevState) => ({
      ...prevState,
      dateEnd: formattedDate,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (eventId) {
        const res = await updateEvent(eventId, formData)
        console.log(res)
        if (res.message) {
          navigate('/events')
        }
      } else {
        const res = await createEvent(formData)
        console.log(res)
        if (res.message) {
          navigate('/events')
        }
      }
    } catch (error) {
      console.error('Error al crear evento:', error)
    }
  }

  useEffect(() => {
    const handleEvent = async () => {
      try {
        if (!eventId) {
          setIsLoading(false)

          return
        }

        const eventData = await getEventById(eventId)

        setFormData(eventData)

        setIsLoading(false)
      } catch (error) {
        console.error('Error al obtener eventos:', error.message)
      }
    }

    handleEvent()
  }, [eventId])

  return (
    <Grid
      item
      xs={8}
      //  sm={10} md={8} lg={6}
    >
      {isLoading && (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <h1>
          {eventId
            ? 'Editar Evento'
            : localStorage.getItem('role') === 'admin'
            ? 'Crear Evento'
            : 'Propuesta de Evento'}
        </h1>
        <Card
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            position: 'relative',
            overflow: 'visible',
            pb: 2,
          }}
        >
          <CardContent>
            <TextField
              fullWidth
              label="Nombre"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              inputProps={{ maxLength: 155 }}
              required
            />
            <Box sx={{ display: 'flex', gap: 2.5, pt: 1.8 }}>
              <TextField
                fullWidth
                label="Título de la Dirección"
                name="addressTitle"
                value={formData.addressTitle}
                onChange={handleChange}
                margin="normal"
                required
              />
              {localStorage.getItem('role') === 'admin' && (
                <TextField
                  fullWidth
                  label="URL Google Maps de Dirección"
                  name="addressURL"
                  value={formData.addressURL}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2.5,
                pt: 1.8,
              }}
            >
              {localStorage.getItem('role') === 'admin' && (
                <>
                  <TextField
                    type="number"
                    label="Participantes"
                    name="participants"
                    sx={{ width: 140 }}
                    value={formData.participants}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    type="number"
                    label="Contribución"
                    name="contributionRequired"
                    sx={{ width: 140 }}
                    value={formData.contributionRequired}
                    onChange={handleChange}
                  />
                </>
              )}
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  label="Fecha de Inicio"
                  value={dateStart}
                  onChange={handleStartDateChange}
                  required
                />
                <DatePicker
                  label="Fecha de Fin"
                  value={dateEnd}
                  onChange={handleEndDataChange}
                  required
                />
              </LocalizationProvider>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="success">
              Enviar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  )
}

export default FormEvent
