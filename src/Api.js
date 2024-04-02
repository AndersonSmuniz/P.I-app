import axios from 'axios';

const api = axios.create({
    baseURL: "https://501c-2804-954-ff47-7900-75d3-f806-ba67-85bf.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;