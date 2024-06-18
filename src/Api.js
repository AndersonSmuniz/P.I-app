import axios from 'axios';

const api = axios.create({
    baseURL: "https://4836-2804-954-ffb3-e600-7844-e600-4e15-2dcf.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;