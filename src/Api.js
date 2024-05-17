import axios from 'axios';

const api = axios.create({
    baseURL: "https://7462-2804-954-fac7-5d00-35d5-9db3-80f1-7751.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;