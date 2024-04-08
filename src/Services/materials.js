
import api from './config'

export const getMaterialsEvents= async () => {
    const response = await api.get('/api/events/materials',{headers:{Authorization:localStorage.getItem('token')}})
    console.log(response)
    return response
}


