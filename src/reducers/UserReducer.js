export const initialState = {
    avatar: '',
    favorites: [],
    appointments: [],
    currentSalon: null,
    listServices: [],
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        case 'setCurrentSalon':
            return { ...state, currentSalon: action.payload.salon };
        case 'setServices':
            return { ...state, listServices: action.payload.services };
        case 'addService':
            return { ...state, listServices: [...state.listServices, action.payload.service] };
        default:
            return state;
    }
}
