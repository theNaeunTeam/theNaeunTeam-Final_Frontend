import axios from 'axios';

const client = axios.create();

client.interceptors.request.use(
    function (config) {
        const userToken = localStorage.getItem('userToken');
        const ownerToken = localStorage.getItem('ownerToken');
        const masterToken = localStorage.getItem('masterToken');

        if (userToken !== null) { // @ts-ignore
            config.headers.Authorization = userToken;
            console.log('userToken 읽기 성공');
            return config;
        }

        if (ownerToken !== null) { // @ts-ignore
            config.headers.Authorization = ownerToken;
            console.log('ownerToken 읽기 성공');
            return config;
        }

        if (masterToken !== null) {// @ts-ignore
            config.headers.Authorization = masterToken;
            console.log('masterToken 읽기 성공');
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