
import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'
import { getCurrentEvents, getPreviousEvents } from '../../Services/eventService'
import './EventCardList.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import FilterAlt from '@mui/icons-material/FilterAlt'

const EventCardList = () => {
    const [events, setEvents] = useState([])
    const [filter, setFilter] = useState('current')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let eventsData = []

                if (filter === 'current') {
                    eventsData = await getCurrentEvents()
                } else if (filter === 'previous') {
                    eventsData = await getPreviousEvents()
                }

                setEvents(eventsData)
            } catch (error) {
                console.error("Error al obtener eventos:", error);
            }
        }

        fetchData()
    }, [filter])

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div>
            <div className='filter-bar'>
                <FormControl>
                    <InputLabel id="filter-label" sx={{ pr: 1 }}></InputLabel>
                    <Select
                        labelId="filter-label"
                        value={filter}
                        onChange={handleFilterChange}
                        startAdornment={<FilterAlt />}
                        sx={{/*  minWidth: '150px' */ }}
                    >
                    
                        <MenuItem value="current">Eventos Próximos</MenuItem>
                        <MenuItem value="previous">Eventos Anteriores</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='event-card-container'>
                {events.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                ))}
            </div>
        </div>
    )
}

export default EventCardList






/*  import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'




import { getCurrentEvents, getPreviousEvents } from '../../Services/eventService'


import './EventCardList.css'
const EventCardList = () => {
    const [events, setEvents] = useState([])
    const [filter, setFilter] = useState('current')

    useEffect(() => {

        const fetchData = async () => {
            try {
                let eventsData = []

                if (filter === 'current') {
                    eventsData = await getCurrentEvents()
                } else if (filter === 'previous') {
                    eventsData = await getPreviousEvents()
                }

                setEvents(eventsData)
            } catch (error) {
                console.error("Error al obtener eventos:", error)
            }
        };

        fetchData();
    }, [filter]) */
    /*       const fetchData = async () => {
              try {
                  const eventsData = await getCurrentEvents()
                  setEvents(eventsData)
              } catch (error) {
                  console.error("Error al obtener eventos:", error)
              }
          }
  
          fetchData()
      }, []) */

    /* return ( */

  /*       <div>

            <div className='filter-bar'>
                <button className={filter === 'current' ? 'active' : ''} onClick={() => setFilter('current')}>Eventos Próximos</button>
                <button className={filter === 'previous' ? 'active' : ''} onClick={() => setFilter('previous')}>Eventos Anteriores</button>
            </div>

            <div className='event-card-container'>
                {events.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                ))}
            </div>


        </div>
    )
}

export default EventCardList */
