import api from './config'

export const getCurrentEvents = async () => {
    try {
        const { data } = await api.get('/api/events')

        return data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
        throw new Error('Error al obtener eventos')
    }
}
export const getPreviousEvents = async () => {
    try {
        const { data } = await api.get('/api/events?filter=previous')

        return data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
        throw new Error('Error al obtener eventos previos')
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
        throw new Error('Error al obtener histórico de eventos del usuario')
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
        throw new Error('Error al obtener eventos inscritos del ususario')
    }
}


export const getEventById = async (id) => {
    try {
        const { data } = await api.get('/api/events/' + id)
        return data
    } catch (error) {
        console.error('Error al obtener evento:', error)
        throw new Error('Error al obtener evento')
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
        throw new Error('Error al obtener evento')
    }
}

export const postCreateEvents = async (eventData) => {
    try {
        console.log(eventData);
        const { data } = await api.post(
            '/api/events',eventData,
            {
                headers:
                { Authorization: localStorage.getItem('token') }
            })
        return data
    } catch (error) {
        console.error('Error al crear eventos:', error)
    }
} 