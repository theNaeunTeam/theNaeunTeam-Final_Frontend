import React, {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {client} from "./api/client";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

export default function FCM() {
    const [show, setShow] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    const [notification, setNotification] = useState<{ title?: string, body?: string, etc?: string, img?: string, }>
    ({
        title: '',
        body: '',
        etc: '',
        img: '',
    });

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
                    setTokenFound(true);
                    client.post(URL, {token: currentToken})
                        .then(res => {
                        })
                        .catch(err => {
                        });
                } else {
                    setTokenFound(false);
                }
            }).catch((err) => {
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
            setNotification({title: payload.data.title, body: payload.data.body})
        })
        .catch(err => {
        });

    useEffect(() => {
        getToken();
    }, [])

    return (
        <>
            {
                isTokenFound || <Alert variant="outlined">
                    알림이 비활성화 상태입니다 <DangerousIcon/>
                </Alert>
            }
            {
                show ? <Alert severity="warning"
                              action={
                                  <Button color="inherit" size="small">
                                      보기
                                  </Button>
                              }>
                        <AlertTitle>{notification.title}</AlertTitle>
                        {notification.body}<AnnouncementIcon/>
                    </Alert>
                    : <Alert variant="outlined" severity="success" style={{height: '50px', marginTop: '17px'}}>알림이 없습니다</Alert>
            }

        </>
    )
}
