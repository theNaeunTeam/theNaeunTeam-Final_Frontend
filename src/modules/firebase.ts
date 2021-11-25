import React from "react";
import firebase from "firebase/compat";
import {client} from "../lib/api/client";

export const firebaseConfig = {
    apiKey: "AIzaSyCdDnZLLw2wo1KpixiGqQKXKKOES0pi1bU",
    authDomain: "final-d076c.firebaseapp.com",
    projectId: "final-d076c",
    storageBucket: "final-d076c.appspot.com",
    messagingSenderId: "416664792102",
    appId: "1:416664792102:web:2e7889a3e32d3b1654cae7",
    measurementId: "G-ZSXE97T7TD"
};

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();

const WEB_PUSH_CERT = 'BJAVCsFlWkRVJ7xWCt9qiEqbnnAnrd_vbmTwvleDjuunVvEJjBX6GVTGpqK0E6OM5qQrabbI954RUhl5LB6_1Ig';

export const getToken = (setTokenFound: React.Dispatch<React.SetStateAction<boolean>>) => {

    const URL = '/owner/pushToken';

    return messaging.getToken({vapidKey: WEB_PUSH_CERT})
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                setTokenFound(true);
                client.post(URL, currentToken)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('알림 권한 거부됨');
                setTokenFound(false);
                // shows on the UI that permission is required
            }
        }).catch((err) => {
            console.log('푸시 토큰 발급 에러', err);
            // catch error while creating client token
        });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });