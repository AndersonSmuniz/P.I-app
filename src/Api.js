import axios from 'axios';

const api = axios.create({
    baseURL: "https://3c9c-2804-954-37c-9100-94a4-c30d-544b-cc2a.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;