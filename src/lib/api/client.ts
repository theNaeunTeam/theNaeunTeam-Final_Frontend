import axios from 'axios';

const client = axios.create();

client.interceptors.request.use(
    function (config) {
        const userToken = localStorage.getItem('userToken');
        const ownerToken = localStorage.getItem('ownerToken');
        const masterToken = localStorage.getItem('masterToken');

        if (userToken !== null) {
            if (config.headers) config.headers.Authorization = userToken;
            return config;
        }

        if (ownerToken !== null) {
            if (config.headers) config.headers.Authorization = ownerToken;
            return config;
        }

        if (masterToken !== null) {
            if (config.headers) config.headers.Authorization = masterToken;
            return config;
        }

        return config;
    },
    function (error) {

        return Promise.reject(error);
    }
);

export {client};