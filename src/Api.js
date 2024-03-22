import axios from 'axios';

const api = axios.create({
    baseURL: "https://2635-2804-954-ff47-7900-ace0-9bce-eb3-85be.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;