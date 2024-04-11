import api from './config'

export const login = async (loginData) => {
  const { data } = await api.post('/api/auth/login', loginData)
  return data
}

export const signup = async (userData) => {
  const { data } = await api.post('/api/auth/signup', userData)
  return data
}

export const getUser = async () => {
  const { data } = await api.get('/api/auth', {
    headers: { Authorization: localStorage.getItem('token') },
  })
  return data
}

export const updateUser = async (userData) => {
  const { data } = await api.put(
    '/api/auth',
    userData,
    { headers: { Authorization: localStorage.getItem('token') } }
  )
  return data
}

export const deleteUser = async () => {
  const { data } = await api.delete(
    '/api/auth',
    { headers: { Authorization: localStorage.getItem('token') } }
  )
  return data
}