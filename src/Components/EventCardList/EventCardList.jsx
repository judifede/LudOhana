import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'
import { fetchEvents } from '../../Services/eventService'

const EventCardList = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await fetchEvents()
                setEvents(eventsData)
            } catch (error) {
                console.error("Error al obtener eventos:", error)
            }
        };

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {events.map((event, idx) => (
                <>
                    <EventCard
                        key={idx}
                        event={event}
                    />
                </>
            ))}
        </div>
    )
}

export default EventCardList
