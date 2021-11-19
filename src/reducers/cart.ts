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
            return [...action.payload];
        case 'modifyItem':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return [...action.payload];
        case 'removeItem':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            const cp = [...state];
            cp.splice(action.payload, 1);
            return cp;
        default:
            console.log('cart 리듀서 일치하는 액션 없음');
            return state;
    }
}
