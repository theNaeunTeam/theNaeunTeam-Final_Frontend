import React, {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {client} from "./api/client";

export default function FCM() {
    const [show, setShow] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});

    const firebaseConfig = {
        apiKey: "AIzaSyCdDnZLLw2wo1KpixiGqQKXKKOES0pi1bU",
        authDomain: "final-d076c.firebaseapp.com",
        projectId: "final-d076c",
        storageBucket: "final-d076c.appspot.com",
        messagingSenderId: "416664792102",
        appId: "1:416664792102:web:2e7889a3e32d3b1654cae7",
        measurementId: "G-ZSXE97T7TD"
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    const WEB_PUSH_CERT = 'BJAVCsFlWkRVJ7xWCt9qiEqbnnAnrd_vbmTwvleDjuunVvEJjBX6GVTGpqK0E6OM5qQrabbI954RUhl5LB6_1Ig';

    const getToken = () => {

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

    const onMessageListener = () =>
        new Promise((resolve) => {
            messaging.onMessage((payload) => {
                resolve(payload);
            });
        });

    onMessageListener()
        .then((payload: any) => {
            setShow(true);
            setNotification({title: payload.notification.title, body: payload.notification.body})
            console.log(payload);
            console.log(payload.notification.title);
            console.log(payload.notification.body);
        })
        .catch(err => console.log('failed: ', err));

    useEffect(() => {
        getToken();
    }, [])

    return (
        <>
            {!isTokenFound && <h3> 푸시알림이 비활성화 상태입니다.</h3>}
            {
                show ? <div>{notification.title}{notification.body}</div>
                    : <h3>알림이 없습니다</h3>
            }

        </>
    )
}
