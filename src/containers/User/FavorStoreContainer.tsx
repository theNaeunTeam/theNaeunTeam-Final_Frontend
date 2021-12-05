import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import Swal from 'sweetalert2';
import '../../lib/styles/table.scss';
import FavorStore from "../../components/User/FavorStore/FavorStore";
import {favorListType} from "../../lib/types";


export default function FavorStoreContainer() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);

    const [startIndex, setStartIndex] = useState(0);
    const [list, setList] = useState<favorListType[]>([]);
    const [loading, setLoading] = useState(true);

    function favoroff() {
        Swal.fire({
            title: '즐겨찾기에서 해제되었습니다',
            text: "즐겨찾기에서 확인하실 수 있습니다.",
            icon: 'success',
            // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            // cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                //"삭제" 버튼을 눌렀을 때 작업할 내용을 이곳에 넣어주면 된다.
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            initialize();
        }
    }, [startIndex]);

    const initialize = async () => {
        const URL = '/user/favorList';
        setLoading(true);
        try {
            const res = await client.get(URL + `?startIndex=${startIndex}`);
            setList(res.data);

        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.');
            } else {
                alert('데이터를 가져오는 중 문제가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')

            }
        }
        setLoading(false);
    };
    // 즐겨찾기 해제 api
    const favorOff = async (input: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!authReducer.isUser) {
            alert('로그인이 필요한 기능입니다.');
            return false;
        }
        const URL = '/user/FavorOff';
        const data: { f_o_sNumber: number } = {
            f_o_sNumber: Number((input.target as HTMLImageElement).title)
        }
        try {
            const res = await client.post(URL, data);
            favoroff();
            initialize();

        } catch (e: any) {
            if (e.response.status === 500) {
                alert("서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.")
            } else if (e.response.status === 400) {
                alert(e.response.data.error);
            } else {
                alert('예상치 못한 에러로 인해 즐겨찾기 해제 실패하였습니다. \n잠시 후 다시 시도 바랍니다.')
            }
        }

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
        <>
            <FavorStore loading={loading} list={list} indexMinus={indexMinus} indexPlus={indexPlus}
                        startIndex={startIndex} favorOff={favorOff}/>
        </>
    )
}
