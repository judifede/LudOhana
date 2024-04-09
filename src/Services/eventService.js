

import api from "./config"

export const getCurrentEvents = async () => {
    try {
        const {data} = await api.get('/api/events')
       
        return data
      
    } catch (error) {
        console.error("Error al obtener eventos:", error)
        throw new Error("Error al obtener eventos")
    }
}
export const getPreviousEvents = async () => {
    try {
        const {data} = await api.get('/api/events?filter=previous')
       
        return data
      
    } catch (error) {
        console.error("Error al obtener eventos:", error)
        throw new Error("Error al obtener eventos previos")
    }
}
export const getUSerEventsPrevius = async () => {
    try {
        const {data} = await api.get('/api/events/user?filter=previous')
       
        return data
      
    } catch (error) {
        console.error("Error al obtener eventos:", error)
        throw new Error("Error al obtener eventos")
    }
}
