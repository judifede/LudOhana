import api from './config'

export const getMaterialsEvents= async () => {
    const response = await api.get('/api/events/materials')
    console.log(response)
    return response
}


