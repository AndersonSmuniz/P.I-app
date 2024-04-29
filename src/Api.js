import axios from 'axios';

const api = axios.create({
    baseURL: "https://c0d7-2804-954-fc59-fb00-a84a-80bd-f5b-7dbc.ngrok-free.app/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;