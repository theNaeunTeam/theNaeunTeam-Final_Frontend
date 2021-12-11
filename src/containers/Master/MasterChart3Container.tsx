import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import '../../lib/styles/masterOwnerDash.scss'
import MasterChart3 from "../../components/Master/MasterChart3";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function MasterChart3Container() {

    const history = useHistory();
    const {fireSweetAlert} = useSweetAlert();

    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
    }, []);

    // 지역
    const [local, setLocal] = useState({
        busan: 0,
        chungcheong: 0,
        daegu: 0,
        daejeon: 0,
        gangwon: 0,
        gwangju: 0,
        gyeonggi: 0,
        gyeongsang: 0,
        incheon: 0,
        jeju: 0,
        jeonla: 0,
        seoul: 0,
        ulsan: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chart();
    }, []);

    // 차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/OwnerUserChart3';
        try {
            const res = await client.get(URL);
            setLocal(res.data);
        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else {
                fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            }
        }
        setLoading(false);
    };

    return (
        <MasterChart3 loading={loading} local={local}/>
    )
}

