import React, {useEffect, useState} from "react";
import {getToken, onMessageListener} from "../../modules/firebase";

export default function FCM() {

    const [show, setShow] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});

    onMessageListener()
        .then((payload: any) => {
            setShow(true);
            setNotification({title: payload.data.title, body: payload.data.body})
            console.log(payload);
        })
        .catch(err => console.log('failed: ', err));

    useEffect(() => {
        getToken(setTokenFound);
    }, [])

    return (
        <>
            {isTokenFound && <h3> 알림이 없습니다 </h3>}
            {!isTokenFound && <h3> 푸시알림이 비활성화 상태입니다.</h3>}
            {show && <h1>{notification.title}{notification.body}</h1>}
        </>
    )
}
