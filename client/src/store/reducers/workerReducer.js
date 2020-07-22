const initialState = {
    id: '',
    firstName: '',
    secondName: '',
    surName: '',
    gender: {
        id: '',
        name: '',
    },
    phone: '',
    date: '',
    salary: {
        id: '',
        size: '',
    },
    position: {
        id: '',
        name: '',
    },
};

const workerReducer  = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_WORKER":
            return { ...action.payload };

        case "RESET_SELECT_WORKER":
            return { ...initialState };

        default:
            return { ...state };
    }
};

export default workerReducer;