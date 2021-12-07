import {cartReducerType} from "../lib/types";

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
