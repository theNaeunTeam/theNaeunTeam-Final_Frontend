import axios from 'axios';

const client = axios.create();

client.interceptors.request.use(
    function (config) {
        const userToken = localStorage.getItem('userToken');
        const ownerToken = localStorage.getItem('ownerToken');
        const masterToken = localStorage.getItem('masterToken');

        if (userToken !== null) { // @ts-ignore
            config.headers.Authorization = userToken;
            return config;
        }

        if (ownerToken !== null) { // @ts-ignore
            config.headers.Authorization = ownerToken;
            return config;
        }

        if (masterToken !== null) {// @ts-ignore
            config.headers.Authorization = masterToken;
            return config;
        }

        return config;
    },
    function (error) {
        // 오류 요청 가공
        return Promise.reject(error);
    }
);

export {client};