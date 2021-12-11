import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import '../../lib/styles/table.scss';
import FavorStore from "../../components/User/FavorStore/FavorStore";
import {favorListType} from "../../lib/types";
import {useSweetAlert} from "../../lib/useSweetAlert";


export default function FavorStoreContainer() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);

    const [startIndex, setStartIndex] = useState(0);
    const [list, setList] = useState<favorListType[]>([]);
    const [loading, setLoading] = useState(true);
    const {fireSweetAlert} = useSweetAlert();

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
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else {
                fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            }
        }
        setLoading(false);
    };
    // 즐겨찾기 해제 api
    const favorOff = async (input: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!authReducer.isUser) {
            // fireSweetAlert({title: '로그인이 필요한 기능입니다', text: '먼저 로그인 해주세요', icon: 'warning'});
            dispatch({type:true});
            return false;
        }
        const URL = '/user/FavorOff';
        const data: { f_o_sNumber: number } = {
            f_o_sNumber: Number((input.target as HTMLImageElement).title)
        }
        try {
            const res = await client.post(URL, data);
            fireSweetAlert({title: '즐겨찾기에서 해제되었습니다', text: '즐겨찾기에서 확인하실 수 있습니다.', icon: 'success'});
            initialize();

        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
            } else {
                alert('예상치 못한 에러로 인해 즐겨찾기 해제 실패하였습니다. \n잠시 후 다시 시도 바랍니다.')
            }
        }

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
        <>
            <FavorStore loading={loading} list={list} indexMinus={indexMinus} indexPlus={indexPlus}
                        startIndex={startIndex} favorOff={favorOff}/>
        </>
    )
}
