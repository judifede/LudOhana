import { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'
import {
  getCurrentEvents,
  getEventsByState,
  getPreviousEvents,
  getUserEvents,
  getUserEventsPrevious,
} from '../../Services/eventService'
import './EventCardList.css'
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  CircularProgress,
} from '@mui/material'
import FilterAlt from '@mui/icons-material/FilterAlt'

const EventCardList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('current')
  const [filterTitle, setFilterTitle] = useState('Eventos Próximos')
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const EVENTS_STATES = {
        propoused: 'Propoused',
        pending: 'Pending',
        aproved: 'Aproved',
        rejected: 'Rejected',
      }
      let eventsData = []

      if (filter === 'current') {
        eventsData = await getCurrentEvents()
      } else if (filter === 'previous') {
        eventsData = await getPreviousEvents()
      } else if (filter === 'userPreviousEvents') {
        eventsData = await getUserEventsPrevious()
      } else if (filter === 'userEventInscribed') {
        eventsData = await getUserEvents()
      } else if (filter === 'EventosPropuestos') {
        eventsData = await getEventsByState(EVENTS_STATES.propoused)
      } else if (filter === 'EventosPendientes') {
        eventsData = await getEventsByState(EVENTS_STATES.pending)
      } else if (filter === 'EventosAprobados') {
        eventsData = await getEventsByState(EVENTS_STATES.aproved)
      } else if (filter === 'EventosRechazados') {
        eventsData = await getEventsByState(EVENTS_STATES.rejected)
      }

      if (eventsData) {
        setEvents(eventsData)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error al obtener eventos:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter, refresh])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    switch (event.target.value) {
      case 'current':
        setFilterTitle('Eventos Próximos')
        break
      case 'previous':
        setFilterTitle('Eventos Anteriores')
        break
      case 'userPreviousEvents':
        setFilterTitle('Mis Eventos Anteriores')
        break
      case 'userEventInscribed':
        setFilterTitle('Mis Eventos Inscritos')
        break
      case 'EventosPropuestos':
        setFilterTitle('Eventos Propuestos')
        break
      case 'EventosPendientes':
        setFilterTitle('Eventos Pendientes')
        break
      case 'EventosAprobados':
        setFilterTitle('Eventos Aprobados')
        break
      case 'EventosRechazados':
        setFilterTitle('Eventos Rechazados')
        break
    }
  }

  return (
    <>
      {isLoading && (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      )}
      <div className="title-Card-Bar">
        <div className="filter-title">
          <h1>{filterTitle}</h1>
        </div>
        <div className="filter-bar">
        <Button
                href='/form-event'
                style={{ color: 'green', textDecoration: 'underline', marginRight: '20px' }}
            >
                Proponer Evento
            </Button>
          <FormControl>
            <InputLabel id="filter-label" />
            <Select
              labelId="filter-label"
              defaultValue="Composed TextField"
              value={filter}
              onChange={handleFilterChange}
              startAdornment={<FilterAlt sx={{ mr: 1 }} />}
              sx={{ width: '250px' }}
            >
              <MenuItem value="current">Eventos Próximos</MenuItem>
              <MenuItem value="previous">Eventos Anteriores</MenuItem>
              {localStorage.getItem('role') === 'user' && (
                <MenuItem value="userPreviousEvents">
                  Mis Eventos Anteriores
                </MenuItem>
              )}
              {localStorage.getItem('role') === 'user' && (
                <MenuItem value="userEventInscribed">
                  Mis Eventos Inscritos
                </MenuItem>
              )}
              {localStorage.getItem('role') === 'admin' && (
                <MenuItem value="EventosPropuestos">
                  Eventos Propuestos
                </MenuItem>
              )}
              {localStorage.getItem('role') === 'admin' && (
                <MenuItem value="EventosPendientes">
                  Eventos Pendientes
                </MenuItem>
              )}
              {localStorage.getItem('role') === 'admin' && (
                <MenuItem value="EventosAprobados">Eventos Aprobados</MenuItem>
              )}
              {localStorage.getItem('role') === 'admin' && (
                <MenuItem value="EventosRechazados">
                  Eventos Rechazados
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </div>
      
      <div className="event-card-container">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} setRefresh={setRefresh} />
        ))}
      </div>
    </>
  )
}

export default EventCardList
