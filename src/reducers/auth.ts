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
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...state, isUser: true, u_id: action.payload};

        case 'ownerMode':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...state, isOwner: true, o_sNumber: action.payload};

        case 'masterMode':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...state, isMaster: true};

        case 'noPermission':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...state, authError: true};
        case 'logoutAll':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            localStorage.clear();
            return defaultValue;
        default:
            console.log('auth 리듀서 일치하는 액션 없음');
            return state;
    }
}