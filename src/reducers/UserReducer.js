export const initialState = {
    avatar: '',
    favorites: [],
    appointments: [],
    currentSalon: null,
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        case 'setCurrentSalon':
            return { ...state, currentSalon: action.payload.salon };
        default:
            return state;
    }
}
