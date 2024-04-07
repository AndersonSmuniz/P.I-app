import axios from 'axios';

const api = axios.create({
    baseURL: "https://0341-138-219-240-57.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;