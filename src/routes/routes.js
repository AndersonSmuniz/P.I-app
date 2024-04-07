import api from "../Api";

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

/**
 * Faz login em um cliente usando os dados fornecidos.
 */
const loginClient = async (data) => {
    try {
        const response = await api.post('api/token/', data)
        return response;
    } catch (error) {
        console.log('Response Erro no login:', error);
        throw error;
    }
}

/**
 * Recupera uma lista de salões da API.
 */
const getSalons = async () => {

    const response = await api.get('salon/');
    return response;
}

const getSalonsFavorites = async () => {

    const response = await api.get('salon/');
    return response;
}

const getSalon = async (id) => {
    try {
        const response = await api.get(`salon/${id}/`);
        return response; 
    } catch (error) {
        console.log("Response Erro na busca do Salão:", error);
        throw new Error ("Nenhum salão encontrado com o ID informado.");
    }
}

const getSalonServices = async (id_salon) => {
    try {
        const response = await api.get(`salon/${id_salon}/services`);
        return response;
    } catch (error) {
        console.log("Response erro ao buscar serviço do salão "+ id_salon, error);
    }
}

const getBarbersService = async (id_service) => {

    try {
        const response = await api.get(`services/${id_service}/barbers`);
        return response;
    } catch (error) {
        console.log("Response erro ao buscar barbeiros do serviço(s)"+ id_service, error);
    }
}

export {
    check_token,
    loginClient,
    getSalons,
    getSalonsFavorites,
    getSalon,
    getSalonServices,
    getBarbersService,
}