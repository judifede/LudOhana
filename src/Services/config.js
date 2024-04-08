import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ludohana.onrender.com'
})

export default api