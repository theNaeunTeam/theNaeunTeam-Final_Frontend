interface actionTypes {
    type: boolean,
}

export function showLoginModal(state = false, action: actionTypes) {
    switch (action.type) {
        case true:
            return true;
        case false:
            return false;
        default:
            return state;
    }
}
