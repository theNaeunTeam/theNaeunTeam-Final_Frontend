const defaultValue = {
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
            return {...state, isUser: true};

        case 'ownerMode':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, isOwner: true};

        case 'masterMode':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, isMaster: true};

        case 'noPermission':
            console.log(action.type, '리듀서 콜');
            console.log(action.payload);
            return {...state, authError: true};

        default:
            console.log('default 리듀서 콜 일치하는 액션 없음');
            return state;
    }
}