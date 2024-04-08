

import api from "./config";

export const fetchEvents = async () => {
    try {
        const {data} = await api.get('/api/events')
        console.log("AAAAAAAAAAAAAAAAAAAA",data)
        return data
       /*  return [ */
          /*   {
                id: 1,
                title: "Fiesta de Burbujas",
                dateStart: '2024-06-10 09:00h',
                dateEnd: '2024-07-10 09:00h',
                info: "info",
                address: "Parque Santa Catalina",
                addressUrl: "https://www.google.es/maps/place/Parque+de+Santa+Catalina/@28.1404515,-15.4336208...",
                inscribed: 20,
                participants: 50
            },
            {
                id: 2,
                title: "Fiesta de Burbujas",
                dateStart: '2024-06-10 09:00h',
                dateEnd: '2024-07-10 09:00h',
                info: "info",
                address: "Parque Santa Catalina",
                addressUrl: "https://www.google.es/maps/place/Parque+de+Santa+Catalina/@28.1404515,-15.4336208...",
                inscribed: 20,
                participants: 50
            },
            // Agrega más eventos aquí si es necesario
        ]; */
    } catch (error) {
        console.error("Error al obtener eventos:", error)
        throw new Error("Error al obtener eventos")
    }
}
