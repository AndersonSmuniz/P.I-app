import React, { createContext, useReducer } from "react";
import { initialState, UserReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const addServiceToList = (service) => {
        const existingService = state.listServices.find(serv => serv.id === service.id);
        const existingCategory = state.listServices.find(serv => serv.category === service.category);
        let listServices = state.listServices;

        if (existingCategory !== undefined) {
            listServices = removeServiceFromList(existingCategory);
        }

        if (existingService === undefined) {
            const updatedServices = [...listServices, service];
            const total = updatedServices.reduce((acc, curr) => acc + parseFloat(curr.price), 0);

            dispatch({ type: 'setServices', payload: { services: updatedServices } });
            dispatch({ type: 'setTotal', payload: { total } });
        }
    };

    const removeServiceFromList = (serviceToRemove) => {
        const updatedServices = state.listServices.filter(service => service.id !== serviceToRemove.id);

        const total = updatedServices.reduce((acc, curr) => acc + parseFloat(curr.price), 0);

        dispatch({ type: 'setServices', payload: { services: updatedServices } });
        dispatch({ type: 'setTotal', payload: { total } });

        return updatedServices;
    };

    return (
        <UserContext.Provider value={{ state, dispatch, addServiceToList, removeServiceFromList }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
