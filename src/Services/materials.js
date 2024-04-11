import api from './config'

export const getMaterialsEvents = async () => {
  const response = await api.get('/api/events/materials', {
    headers: { Authorization: localStorage.getItem('token') },
  })
  return response.data.allMaterialEventData
}

export const deleteMaterialsToEvent = async (materialId, eventId) => {
  const { data } = await api.delete(
    `/api/events/${eventId}/material/${materialId}`,
    { headers: { Authorization: localStorage.getItem('token') } }
  )
  return data
}
export const updateMaterials = async (materialId, materialData) => {
  const { data } = await api.put(`/api/materials/${materialId}`, materialData, {
    headers: { Authorization: localStorage.getItem('token') },
  })
  return data
}


export const addMaterialEvent = async (eventId, materialId, {eventInputId,amountUsedMaterials}) => {
  const { data } = await api.put(
    `/api/events/${eventId}/materials/${materialId}`,
    { eventId:eventInputId, materialId, amountUsed:amountUsedMaterials },
    { headers: { Authorization: localStorage.getItem('token') } }
  )
  return data
}
