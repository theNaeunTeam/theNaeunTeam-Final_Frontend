const defaultValue = {
    o_sNumber: '',
    u_id: '',
    m_id: '',
    isMaster: false,
    isOwner: false,
    isUser: false,
    authError: false,
}

interface actionTypes {
    type: string,
    payload: any,
}

export function authReducer(state = defaultValue, action: actionTypes) {
    switch (action.type) {
        case 'userMode':
            return {...state, isUser: true, u_id: action.payload};

        case 'ownerMode':
            return {...state, isOwner: true, o_sNumber: action.payload};

        case 'masterMode':
            return {...state, isMaster: true};

        case 'noPermission':
            return {...state, authError: true};
        case 'logoutAll':
            localStorage.clear();
            return defaultValue;
        default:
            return state;
    }
}
