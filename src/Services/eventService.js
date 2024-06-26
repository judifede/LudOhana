import api from './config'

export const getCurrentEvents = async () => {
  try {
    const { data } = await api.get('/api/events')

    return data
  } catch (error) {
    // console.error('Error al obtener eventos:', error.message)
  }
}
export const getPreviousEvents = async () => {
  try {
    const { data } = await api.get('/api/events?filter=previous')

    return data
  } catch (error) {
    // console.error('Error al obtener eventos:', error.message)
  }
}
export const getUserEventsPrevious = async () => {
  try {
    const { data } = await api.get('/api/events/user?filter=previous', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []
    }
    // console.error('Error al obtener eventos:', error)
  }
}

export const getUserEvents = async () => {
  try {
    const { data } = await api.get('/api/events/user', {
      headers: { Authorization: localStorage.getItem('token') },
    })

    return data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []
    }
    //console.error('Error al obtener eventos:', error)
  }
}

export const getEventsByState = async (state) => {
  try {
    const { data } = await api.get(`/api/events?state=${state}`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al obtener eventos:', error.message)
  }
}

export const getEventContributions = async (id) => {
  try {
    const { data } = await api.get(`/api/events/${id}/contributions`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al obtener eventos:', error.message)
  }
  try {
    const { data } = await api.get('/api/events/user', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al obtener eventos:', error.message)
  }
}

export const getEventById = async (id) => {
  try {
    const { data } = await api.get('/api/events/' + id)
    return data
  } catch (error) {
    // console.error('Error al obtener evento:', error.message)
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
    // console.error('Error al obtener evento:', error.message)
  }
}

export const createEvent = async (eventData) => {
  try {
    const { data } = await api.post('/api/events', eventData, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al crear eventos:', error)
  }
}

export const updateEvent = async (eventId, eventData) => {
  try {
    const { data } = await api.put('/api/events/' + eventId, eventData, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al crear eventos:', error)
  }
}

export const postCreateEvents = async () => {
  try {
    const { data } = await api.get('/api/events', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al obtener eventos:', error.message)
  }
}

export const deleteEvent = async (eventId) => {
  try {
    const { data } = await api.delete('/api/events/' + eventId, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al obtener evento:', error.message)
  }
}

export const deleteUserEvent = async (eventId) => {
  try {
    const { data } = await api.delete('/api/events/' + eventId + '/user', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error('Error al obtener evento:', error.message)
  }
}
