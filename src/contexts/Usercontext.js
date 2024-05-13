import React, { createContext, useReducer } from "react";
import { initialState, UserReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

export default ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    // Função para adicionar um serviço à lista e atualizar o total
    const addServiceToList = (service) => {
        const updatedServices = [...state.listServices, service];
        const total = updatedServices.reduce((acc, curr) => acc + curr.price, 0);
        dispatch({ type: 'setServices', payload: { services: updatedServices } });
        dispatch({ type: 'setTotal', payload: { total } });
    };

    // Função para remover um serviço da lista e atualizar o total
    const removeServiceFromList = (serviceId) => {
        const updatedServices = state.listServices.filter(service => service.id !== serviceId);
        const total = updatedServices.reduce((acc, curr) => acc + curr.price, 0);
        dispatch({ type: 'setServices', payload: { services: updatedServices } });
        dispatch({ type: 'setTotal', payload: { total } });
    };

    return (
        <UserContext.Provider value={{ state, dispatch, addServiceToList, removeServiceFromList }}>
            {children}
        </UserContext.Provider>
    );
};