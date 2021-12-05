const defaultValue = {
    lat: 0,
    lon: 0,
};

interface actionTypes {
    type: string,
    payload: any,
}

export function userLocalMap(state = defaultValue, action: actionTypes) {
    switch (action.type) {
        case 'getLocaled':
            localStorage.setItem('lat', action.payload.lat);
            localStorage.setItem('lon', action.payload.lon);
            return {...state, ...action.payload}
        default:
            return state;
    }
}