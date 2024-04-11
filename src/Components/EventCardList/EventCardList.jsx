import { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'
import {
  getCurrentEvents,
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

  const fetchData = async () => {
    try {
      let eventsData = []

      if (filter === 'current') {
        eventsData = await getCurrentEvents()
      } else if (filter === 'previous') {
        eventsData = await getPreviousEvents()
      } else if (filter === 'userPreviousEvents') {
        eventsData = await getUserEventsPrevious()
      } else if (filter === 'userEventInscribed')
        eventsData = await getUserEvents()

      setEvents(eventsData)
      setIsLoading(false)
    } catch (error) {
      console.error('Error al obtener eventos:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter])

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
    }
  }

  return (
    <>
    {
      isLoading && <CircularProgress sx={{display: "block", margin: "auto"}}/>
    }
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
              <MenuItem value="userPreviousEvents">
                Mis Eventos Anteriores
              </MenuItem>
              <MenuItem value="userEventInscribed">
                Mis Eventos Inscritos
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="event-card-container">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    </>
  )
}

export default EventCardList
