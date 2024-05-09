import axios from 'axios';

const api = axios.create({
    baseURL: "https://8460-2804-954-ffb5-9d00-a1ba-64c2-abe3-3d3a.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;