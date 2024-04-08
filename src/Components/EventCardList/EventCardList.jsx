import React, { useEffect, useState } from 'react'
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
    }, [filter])
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

    return (

        <div>

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

export default EventCardList
