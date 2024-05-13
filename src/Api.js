import axios from 'axios';

const api = axios.create({
    baseURL: "https://fbbd-138-36-242-111.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;