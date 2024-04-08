
import api from './config'

export const getMaterialsEvents= async () => {
    const response = await api.get('/api/events/materials',{headers:{Authorization:localStorage.getItem('token')}})
    console.log(response.data.allMaterialEventData)
    return response.data.allMaterialEventData
}


