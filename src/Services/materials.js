import api from './config'

export const getMaterialsEvents = async () => {
  const response = await api.get('/api/events/materials', {
    headers: { Authorization: localStorage.getItem('token') },
  })
  console.log(response.data.allMaterialEventData)
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
  console.log(materialData.amountUsed)
  try {
    const { data } = await api.put(
      `/api/events/${materialData.eventId}/materials/${materialId}`,
      { amountUsed: materialData.amountUsed },
      { headers: { Authorization: localStorage.getItem('token') } }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createMaterials = async (materialData) => {
  console.log(materialData)
  const { data } = await api.post(`/api/materials`, materialData, {
    headers: { Authorization: localStorage.getItem('token') },
  })
  return data
}

export const createMaterialEvent = async (materialData) => {
  try {
    console.log(materialData)
    const { data } = await api.post(`/api/events/materials`, materialData, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
