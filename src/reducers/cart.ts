const defaultValue = [{
    g_code: 0,
    g_count: 0,
    g_name: '',
    g_status: 0,
    g_price: 0,
    g_discount: 0,
    g_image: '',
    o_name: '',
    u_id: '',
}]

interface actionTypes {
    type: string,
    payload: any,
}

export function cartReducer(state = defaultValue, action: actionTypes) {
    switch (action.type) {
        case 'cartIn':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...action.payload};
        case 'modify':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...state};
        default:
            console.log('goods 리듀서 일치하는 액션 없음');
            return state;
    }
}
