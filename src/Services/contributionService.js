import api from './config'

export const checkout = async (bodyObj) => {
  try {
    const { data } = await api.post('/api/contribution/checkout', bodyObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('Error al generar la pasarela de pago')
  }
}
