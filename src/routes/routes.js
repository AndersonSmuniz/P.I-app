import api from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addTokenToRequest = async (method, endpoint, data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const tokenJson = JSON.parse(token);
        const headers = {
            Authorization: `Bearer ${tokenJson.access}`,
        };

        let response;
        if (method === 'GET') {
            response = await api.get(endpoint, { headers });
        } else if (method === 'POST') {
            response = await api.post(endpoint, data, { headers });
        } else if (method === 'PUT') {
            response = await api.put(endpoint, data, { headers });
        } else if (method === 'DELETE') {
            response = await api.delete(endpoint, { headers });
        } else {
            throw new Error('Método de requisição não suportado.');
        }

        return response;
    } catch (error) {
        console.error(`Erro na requisição ${endpoint}:`, error);
        throw error;
    }
};

const handleUnauthorizedError = async (error) => {
    if (error.response && error.response.status === 401) {
        try {
            // Atualiza o token
            await refresh_token();
            // Tenta a requisição novamente
            return await addTokenToRequest(error.config.method, error.config.url, error.config.data);
        } catch (refreshError) {
            // Se houver erro ao atualizar o token, redireciona para SignIn
            console.error('Erro ao atualizar token:', refreshError);
            throw new Error('Token expirado, faça login novamente.');
        }
    } else {
        throw error;
    }
};

/**
 * Verifica a validade de um token fornecido.
 */
const check_token = async (data) => {
    try {
        const response = await api.post('api/token/verify/', data);
        console.log('sasda', response);
        return response.data;
    } catch (error) {
        console.error('Erro ao checar token:', error);
        throw error;
    }
};

const refresh_token = async () => {
    const data = await AsyncStorage.getItem('token');
    try {
        const response = await api.post('api/token/refrech/', data);
        return response.data
    } catch (error) {
        console.error('erro ao atualizar o token', error);
        throw error;
    }
}

/**
 * Faz login em um cliente usando os dados fornecidos.
 */
const login_client = async (data) => {
    try {
        const response = await api.post('api/token/', data);
        return response;
    } catch (error) {
        console.error('Response Erro no login:', error);
        throw error;
    }
}

/**
 * Recupera uma lista de salões da API.
 */
const getSalons = async () => {
    try {
        const response = await addTokenToRequest('GET', 'salon/');
        console.log(response.data);
        return response;
    } catch (error) {
        console.error('Erro ao obter lista de salões:', error);
        throw error;
    }
}

/**
 * Recupera uma lista de salões favoritos da API.
 */
const getSalonsFavorites = async () => {
    try {
        const response = await addTokenToRequest('GET', 'salon/');
        return response;
    } catch (error) {
        console.error('Erro ao obter lista de salões favoritos:', error);
        throw error;
    }
}

/**
 * Recupera os detalhes de um salão específico.
 */
const getSalon = async (id) => {
    try {
        const response = await addTokenToRequest('GET', `salon/${id}/`);
        return response;
    } catch (error) {
        console.error('Erro ao obter detalhes do salão:', error);
        throw new Error("Nenhum salão encontrado com o ID informado.");
    }
}

/**
 * Recupera as categorias de um salão específico.
 */
const getSalonCategory = async (id_salon) => {
    try {
        const response = await addTokenToRequest('GET', `salon/${id_salon}/category`);
        return response;
    } catch (error) {
        console.error('Erro ao obter categorias do salão:', error);
        throw error;
    }
}

/**
 * Recupera os serviços de uma categoria específica de salão.
 */
const getSalonServices = async (id_category) => {
    try {
        const response = await addTokenToRequest('GET', `category/${id_category}/services`);
        return response;
    } catch (error) {
        console.error('Erro ao obter serviços do salão:', error);
        throw error;
    }
}

/**
 * Recupera os barbeiros de um determinado serviço de salão.
 */
const getBarbersService = async (salon_id) => {
    try {
        const response = await addTokenToRequest('GET', `salon/${salon_id}/collaborators`);
        return response;
    } catch (error) {
        console.error('Erro ao obter barbeiros do serviço:', error);
        throw error;
    }
}

/**
 * Recupera os horários disponíveis de um barbeiro para uma determinada data e serviços.
 */
const getScheduleBarber = async (barber, date, services) => {
    try {
        const response = await addTokenToRequest('GET', `schedule/barber/${barber}/date/${date}/`, {
            params: {
                services: services
            }
        });
        return response;
    } catch (error) {
        console.error('Erro ao obter horários disponíveis do barbeiro:', error);
        throw error;
    }
}

export {
    check_token,
    login_client,
    getSalons,
    getSalonsFavorites,
    getSalon,
    getSalonCategory,
    getSalonServices,
    getBarbersService,
    getScheduleBarber,
}
