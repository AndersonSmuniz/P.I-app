import api from "../Api";

const check_token = async (data) => {
    try {
        const response = await api.post('api/token/verify/', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao checar token:', error);
        throw error;
    }
};

const Login_client = async (data) => {
    try {
        const response = await api.post('api/token/', data)
        return response.data;
    } catch (error) {
        console.log('Erro no login:', error);
        throw error;
    }
}

export default (check_token, Login_client);