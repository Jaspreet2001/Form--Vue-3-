import axios from 'axios'

const axiosIns = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
})

export default axiosIns