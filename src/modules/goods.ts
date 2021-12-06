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
}

export function goodsReducer(state = defaultValue, action: actionTypes) {
    switch (action.type) {
        case 'passToModifyPage':
            return {...state, ...action.payload, isModify: true};
        case 'modifyOK':
            return {...defaultValue}
        default:
            return state;
    }
}
