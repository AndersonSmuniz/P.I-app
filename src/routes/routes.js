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

const getSalonCategory = async (id_salon) => {
    try {
        const response = await api.get(`salon/${id_salon}/category`);
        return response;
    } catch (error) {
        console.log("Response erro ao buscar categorias do salão "+ id_salon, error);
    }
}

const getSalonServices = async (id_category) => {
    try {
        const response = await api.get(`category/${id_category}/services`);
        return response;
    } catch (error) {
        console.log("Response erro ao buscar serviço do salão "+ id_category, error);
    }
}

const getBarbersService = async (salon_id) => {

    try {
        console.log("colla", salon_id);
        const response = await api.get(`salon/${salon_id}/collaborators`);
        console.log(response.data);
        return response;
    } catch (error) {
        console.log("Response erro ao buscar barbeiros do serviço(s)"+ salon_id, error);
    }
}

const getScheduleBarber = async (barber, date, services) => {
    try {
        console.log(date, services);
        const response = await api.get(`schedule/barber/${barber}/date/${date}/`, {
            params: {
                services: services
            }
        });
        return response;
    } catch (error) {
        console.log("Error fetching barber:", error);
    }
}

export {
    check_token,
    loginClient,
    getSalons,
    getSalonsFavorites,
    getSalon,
    getSalonCategory,
    getSalonServices,
    getBarbersService,
    getScheduleBarber,
}