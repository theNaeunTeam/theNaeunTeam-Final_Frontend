import {cartReducerType} from "../lib/types";

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

export function cartReducer(state: cartReducerType[] = [], action: actionTypes) {
    switch (action.type) {
        case 'cartIn':
            return [...action.payload];
        case 'modifyItem':
            return [...action.payload];
        case 'removeItem':
            const cp = [...state];
            cp.splice(action.payload, 1);
            return cp;
        case 'orderIn':
            return [...state,];
        case 'orderOut':
            return [];
        default:
            return state;
    }
}
