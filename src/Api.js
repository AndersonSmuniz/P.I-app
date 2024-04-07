import axios from 'axios';

const api = axios.create({
    baseURL: "https://1b10-2804-954-ff22-8300-c01a-f95-cac3-6595.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;