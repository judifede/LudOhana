import api from './config'

export const login = async (loginData) => {
    const response = await api.post('/api/auth/login', loginData)
    console.log(response.data.token)
    return response
}