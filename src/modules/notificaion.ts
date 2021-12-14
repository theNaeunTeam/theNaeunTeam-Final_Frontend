const defaultValue = {
    show: false,
    title: '',
    body: '',
};

interface actionTypes {
    type: string,
    payload?: any,
}

export function notificationReducer(state = defaultValue, action: actionTypes) {
    switch (action.type) {
        case 'received':
            return {...action.payload};
        case 'clear':
            return {...defaultValue}
        default:
            return state;
    }
}
