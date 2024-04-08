

import api from "./config";

export const fetchEvents = async () => {
    try {
        const {data} = await api.get('/api/events')
        return data
       
    } catch (error) {
        console.error("Error al obtener eventos:", error)
        throw new Error("Error al obtener eventos")
    }
}


export const getEventById = async (id) => {
    try {
        const {data} = await api.get('/api/events/'+id)
        console.log(data)
        return data
       
    } catch (error) {
        console.error("Error al obtener evento:", error)
        throw new Error("Error al obtener evento")
    }
}
