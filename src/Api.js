import axios from 'axios';

const api = axios.create({
    baseURL: "https://91c7-2804-954-fcf8-d700-2520-cea7-71d4-9fc1.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;