import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import '../../lib/styles/table.scss'
import {dummyType} from "../../lib/types";
import UserReserve from "../../components/User/UserReserve/UserReserve";
import {useSweetAlert} from "../../lib/useSweetAlert";


export default function UserReserveContainer() {

    const [startIndex, setStartIndex] = useState(0);
    const history = useHistory();
    const {fireSweetAlert} = useSweetAlert();

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
            fireSweetAlert({title: '예약 취소 완료되었습니다', icon: 'success'});
        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});

            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
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
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else {
                alert('데이터를 불러오는데 실패하였습니다. \n잠시 후 다시 시도 바랍니다.')
            }
        }
        setLoading(false);

    }

    const indexMinus = () => {
        if (startIndex === 0) {
            fireSweetAlert({title: '첫페이지 입니다', icon: 'info'});
        } else {
            setStartIndex(startIndex - 10);
        }
    }
    const indexPlus = () => {
        if (list.length === 10) {
            setStartIndex(startIndex + 10);
        } else {
            fireSweetAlert({title: '마지막 페이지 입니다', icon: 'info'});
        }


    }

    return (
        <UserReserve loading={loading} g_category={g_category} setG_category={setG_category} r_status={r_status}
                     setR_status={setR_status} setSearchInput={setSearchInput} searchReserve={searchReserve} list={list}
                     changeReserveStatus={changeReserveStatus} indexMinus={indexMinus} startIndex={startIndex}
                     indexPlus={indexPlus}/>
    )
}
