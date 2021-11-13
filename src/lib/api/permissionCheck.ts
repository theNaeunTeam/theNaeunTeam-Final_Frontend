import {client} from "./client";

export const permissionCheck = async () => {

    const token = localStorage.getItem('token');
    console.log('token=', token);
    if (token === null) return false;

    const data = {
        token: token,
    }

    try {
        const res = client.post('/auth/login', data);
        console.log(res);
    } catch (e) {
        console.log(e);
    }

}
