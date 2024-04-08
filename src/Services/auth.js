import api from './config'

export const login = async (loginData) => {
    const response = await api.post('/api/auth/login', loginData)
    return response
}
export const signup = async (userData) => {
    const {data} = await api.post('/api/auth/signup',userData)
    console.log(userData)
  
  

    return data

}