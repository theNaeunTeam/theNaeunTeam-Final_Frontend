const defaultValue = {
    b_owner: '',
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
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, isUser: true, u_id: action.payload};

        case 'ownerMode':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, isOwner: true, b_owner: action.payload};

        case 'masterMode':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, isMaster: true};

        case 'noPermission':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, authError: true};
        case 'logoutAll':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return defaultValue;
        default:
            console.log('default 리듀서 콜 일치하는 액션 없음');
            return state;
    }
}