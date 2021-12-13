import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {conType} from "../../lib/types";
import OwnerDashS from "../../components/Owner/OwnerDashS";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function OwnerDashSContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const value = {
        sum: 0,
        tal: 0,
    }
    const [noShow, setNoShow] = useState<conType>(value);
    const [cancel, setCancel] = useState<conType>(value);
    const [over, setOver] = useState<conType>(value);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('ownerToken')) {
            initialize();
        }
    }, []);

    const initialize = async () => {

        const URL = '/owner/getOwnerBoard';

        try {
            const res = await client.get(URL);

            setNoShow(res.data.a);
            setCancel(res.data.b);
            setOver(res.data.c);

        } catch (e: any) {
            if (e.response.data.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});

            } else {
                fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            }

        }
        setLoading(false)
    }

    return (
        <OwnerDashS loading={loading} noShow={noShow} over={over} cancel={cancel}/>
    )
}
