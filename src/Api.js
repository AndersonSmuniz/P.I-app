import axios from 'axios';

const api = axios.create({
    baseURL: "https://cfec-2804-954-fac7-5d00-d020-4799-112d-4ec.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;