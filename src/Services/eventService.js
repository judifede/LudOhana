import api from './config'

export const fetchEvents = async () => {
  try {
    const { data } = await api.get('/api/events')
    return data
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    throw new Error('Error al obtener eventos')
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
