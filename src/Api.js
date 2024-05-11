import axios from 'axios';

const api = axios.create({
    baseURL: "https://8e01-2804-954-fc9e-400-e0e4-27a-1956-d283.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;