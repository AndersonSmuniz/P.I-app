import React, { createContext, useReducer } from "react";
import { initialState, UserReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

export default ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const addServiceToList = (service) => {
        const existingService = state.listServices.find(serv => serv.id === service.id);
        const existingCategory = state.listServices.find(serv => serv.category === service.category);
        console.log('jjjjjjjjjjjjjjjjjj',existingService, existingCategory);
        let listServices = state.listServices
        if (existingCategory !== undefined) {
            listServices = removeServiceFromList(existingCategory);
        }
        if (existingService === undefined) {
            console.log(listServices);
            const updatedServices = [...listServices, service];
            const total = updatedServices.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
            dispatch({ type: 'setServices', payload: { services: updatedServices } });
            dispatch({ type: 'setTotal', payload: { total } });
        }
    };

    // Função para remover um serviço da lista e atualizar o total
    const removeServiceFromList = (serviceToRemove) => {
        const updatedServices = state.listServices.filter(service => service.id !== serviceToRemove.id);
        console.log(updatedServices);
        // Calcula o novo total com base nos serviços atualizados
        const total = updatedServices.reduce((acc, curr) => acc + parseFloat(curr.price), 0);

        // Atualiza o estado global com a nova lista de serviços e o novo total
        dispatch({ type: 'setServices', payload: { services: updatedServices } });
        dispatch({ type: 'setTotal', payload: { total } });
        return updatedServices
    };

    return (
        <UserContext.Provider value={{ state, dispatch, addServiceToList, removeServiceFromList }}>
            {children}
        </UserContext.Provider>
    );
};