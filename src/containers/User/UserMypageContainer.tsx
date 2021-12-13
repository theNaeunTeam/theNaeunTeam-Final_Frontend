import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {userMyPageType} from "../../lib/types";
import UserMyPage from "../../components/User/UserMyPage";
import {useSweetAlert} from "../../lib/useSweetAlert";


export default function UserMypageContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) {
            alert('로그인 후 이용가능합니다.');
            history.push('/');
            dispatch({type: true});
        }
    }, []);


    const initialValue = {
        u_id: '',
        save: 0,
        u_point: 0,
        reserve: 0,
    };

    const [userData, setUserData] = useState<userMyPageType>(initialValue);

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            initialize();
        }

    }, []);

    const initialize = async () => {
        setLoading(true);
        const URL = '/user/myPage';
        try {
            const res = await client.get(URL);
            setUserData(res.data);
        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
                history.push('/');

            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
                history.goBack();

            } else {
                alert('데이터를 불러오는데 실패했습니다. \n잠시 후 다시 시도 바랍니다.')
                history.goBack();

            }
        }
        setLoading(false);
    }

    return (
        <UserMyPage loading={loading} userData={userData}/>
    )
}
