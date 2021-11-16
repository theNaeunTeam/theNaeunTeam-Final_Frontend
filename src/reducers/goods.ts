const defaultValue = {
    isModify: false,
    g_owner: '',
    g_code: 0,
    g_name: '',
    g_count: 0,
    g_price: 0,
    g_discount: 0,
    g_detail: '',
    g_image: '',
    g_expireDate: '',
    g_category: '',
};

interface actionTypes {
    type: string,
    payload: any,
};

export function goodsReducer(state = defaultValue, action: actionTypes) {
    switch (action.type) {
        case 'passToModifyPage':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...state, ...action.payload, isModify: true};
        case 'modifyOK':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return {...defaultValue}
        default:
            console.log('goods 리듀서 일치하는 액션 없음');
            return state;
    }
}