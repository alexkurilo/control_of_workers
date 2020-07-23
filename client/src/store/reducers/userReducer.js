const initialState = {
    // role: 'user',
    // role: 'admin',
    role: null,
};

const userReducer  = (state = initialState, action) => {
    switch (action.type) {
        case "USER_ROLE_SAVE":
            return {
                ...state,
                role: action.payload
            };

        default:
            return {
                ...state
            };
    }
};

export default userReducer;