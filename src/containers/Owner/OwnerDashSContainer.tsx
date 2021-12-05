import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {conType} from "../../lib/types";
import OwnerDashS from "../../components/Owner/OwnerDashS";

export default function OwnerDashSContainer() {
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
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.');

            } else {
                alert('데이터를 가져오는 중 문제가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')
            }

        }
        setLoading(false)
    }

    return (
        <OwnerDashS loading={loading} noShow={noShow} over={over} cancel={cancel}/>
    )
}
