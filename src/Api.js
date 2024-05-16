import axios from 'axios';

const api = axios.create({
    baseURL: "https://2c71-2804-954-fc4d-1000-3c0a-775e-ae95-4dc4.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;