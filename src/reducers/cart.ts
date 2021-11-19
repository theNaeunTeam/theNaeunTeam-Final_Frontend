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

type defaultType = {
    g_code: number,
    g_count: number,
    g_name: string,
    g_status: number,
    g_price: number,
    g_discount: number,
    g_image: string,
    o_name: string,
    u_id: string,
}

interface actionTypes {
    type: string,
    payload: any,
}

export function cartReducer(state:defaultType[] = [], action: actionTypes) {
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
        case 'orderIn':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return [...state,];
        case 'orderOut':
            console.log(action.type, '리듀서 콜');
            console.log('화물 => ', action.payload);
            return [];
        default:
            console.log('cart 리듀서 일치하는 액션 없음');
            return state;
    }
}

//
// interface test {
//     r_u_id: string, // 유저 아이디
//     r_g_code: number[배열?], // 상품 고유 번호
//     r_firstTime: string, // 방문예약시간
//     r_count: number[배열?], // 몇개예약
//     r_customOrder: string,
//     r_owner: string,// 사업자번호
//     r_pay: number, // 결제 금액 토탈
// }

















