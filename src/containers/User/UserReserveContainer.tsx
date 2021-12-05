import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import '../../lib/styles/table.scss'
import {dummyType} from "../../lib/types";
import UserReserve from "../../components/User/UserReserve/UserReserve";


export default function UserReserveContainer() {

    const {authReducer} = useSelector((state: RootState) => state);
    const [startIndex, setStartIndex] = useState(0);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);


    const [list, setList] = useState<dummyType[]>([]);
    const [g_category, setG_category] = useState('');
    const [r_status, setR_status] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            searchReserve();
        }
    }, [startIndex]);

    const changeReserveStatus = async (input: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setLoading(true);
        const data: { r_code: number } = {
            r_code: Number((input.target as HTMLButtonElement).name)
        };

        const URL = '/user/changeReserveStatus';

        try {
            const res = await client.patch(URL, data);
            searchReserve();
            alert('예약 취소 완료되었습니다.');
        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. 잠시 후 다시 시도 바랍니다.')

            } else if (e.response.status === 400) {
                alert(e.response.data.error)
            } else {
                alert('데이터를 변경하는데 실패하였습니다. 잠시 후 다시 시도 바랍니다.')
            }
        }
        setLoading(false);
    }
    const searchReserve = async () => {
        setLoading(true);
        const URL = '/user/searchReserve';
        if (g_category != '' || r_status != '' || searchInput != '') {
            setStartIndex(0);
        }
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&r_status=${r_status}&searchInput=${searchInput}&startIndex=${startIndex}`);
            setList(res.data);
        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')
            } else {
                alert('데이터를 불러오는데 실패하였습니다. \n잠시 후 다시 시도 바랍니다.')
            }
        }
        setLoading(false);

    }

    const indexMinus = () => {
        if (startIndex === 0) {
            alert('첫 페이지입니다.');
        } else {
            setStartIndex(startIndex - 10);
        }
    }
    const indexPlus = () => {
        if (list.length === 10) {
            setStartIndex(startIndex + 10);
        } else {
            alert('마지막 페이지입니다.');
        }


    }

    return (
        <UserReserve loading={loading} g_category={g_category} setG_category={setG_category} r_status={r_status}
                     setR_status={setR_status} setSearchInput={setSearchInput} searchReserve={searchReserve} list={list}
                     changeReserveStatus={changeReserveStatus} indexMinus={indexMinus} startIndex={startIndex}
                     indexPlus={indexPlus}/>
    )
}
