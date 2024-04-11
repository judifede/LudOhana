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

export const addMaterialEvent = async (eventId, materialId, materialData) => {
  try {
    const { data } = await api.put(
      `/api/events/${materialData.eventId}/materials/${materialId}`,
      { amountUsed: materialData.amountUsed },
      { headers: { Authorization: localStorage.getItem('token') } }
    )
    return data
  } catch (error) {
    // console.error(error)
  }
}

export const createMaterials = async (materialData) => {
  const { data } = await api.post(`/api/materials`, materialData, {
    headers: { Authorization: localStorage.getItem('token') },
  })
  return data
}

export const createMaterialEvent = async (materialData) => {
  try {
    const { data } = await api.post(`/api/events/materials`, materialData, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    // console.error(error)
  }
}
