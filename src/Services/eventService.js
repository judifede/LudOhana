import api from './config'

export const getCurrentEvents = async () => {
    try {
        const { data } = await api.get('/api/events')

        return data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
    }
}
export const getPreviousEvents = async () => {
    try {
        const { data } = await api.get('/api/events?filter=previous')

        return data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
    }
}
export const getUserEventsPrevious = async () => {
    try {
        const { data } = await api.get(
            '/api/events/user?filter=previous',
            {
                headers:
                    { Authorization: localStorage.getItem('token') }
            })
        return data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
    }
}

export const getUserEvents = async () => {
    try {
        const { data } = await api.get(
            '/api/events/user',
            {
                headers:
                    { Authorization: localStorage.getItem('token') }
            })
        return data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
    }
}

export const getEventById = async (id) => {
    try {
        const { data } = await api.get('/api/events/' + id)
        return data
    } catch (error) {
        console.error('Error al obtener evento:', error)
    }
}

export const registerUserEvent = async (inscribed, eventId) => {
    try {
        const { data } = await api.put(
            '/api/events/' + eventId + '/user',
            inscribed,
            { headers: { Authorization: localStorage.getItem('token') } }
        )
        return data
    } catch (error) {
        console.error('Error al obtener evento:', error)
    }
}

export const createEvent = async (eventData) => {
    try {

        const { data } = await api.post(
            '/api/events', eventData,
            {
                headers:
                    { Authorization: localStorage.getItem('token') }
            })
        return data
    } catch (error) {
        console.error('Error al crear eventos:', error)
    }
} 