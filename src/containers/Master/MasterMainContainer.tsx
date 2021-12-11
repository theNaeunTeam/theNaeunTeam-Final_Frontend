import React, {useEffect, useState} from 'react';
import {GridColDef, GridRowId} from '@mui/x-data-grid';
import {client} from "../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {masterMainType2} from "../../lib/types";
import '../../lib/styles/masterOwnerDash.scss';
import '../../lib/styles/MasterLoginForm.scss';
import MasterMain from "../../components/Master/MasterMain";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function MasterMainContainer() {

    const initialValue = [{
        id: '',
        o_approval: '',
        o_sNumber: '',
        o_phone: '',
        o_name: '',
        o_cellPhone: '',
        o_address: '',
        o_latitude: '',
        o_longitude: '',
        o_date: '',
        o_time1: '',
        o_time2: '',
        o_image: '',
    }];

    const [rows, setRows] = useState<masterMainType2[]>(initialValue);
    const [selected, setSelected] = useState<GridRowId[]>([]);
    const [loginForm, setLoginForm] = useState({m_id: '', m_pw: ''}); // 마스터 로그인 폼 핸들러
    const [loading, setLoading] = useState(true);
    const {fireSweetAlert} = useSweetAlert();

    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('masterToken')) ownerTableInit();
    }, []);

    const login = async () => {
        setLoading(true);
        const URL = '/common/masterlogin';

        try {
            const res = await client.post(URL, loginForm);

            // 마스터 로그인 성공시
            if (res.status === 200) {

                // 스토어의 isMaster를 true로 바꿈
                dispatch({type: 'masterMode'});

                // 로칼스토리지에 토큰값 저장
                localStorage.setItem('masterToken', res.headers["x-auth-token"]);

                // 리스트 불러오는 함수 실행
                await ownerTableInit();
            }
        } catch (e) {
            // @ts-ignore
            const err = e.response;
            fireSweetAlert({title: err.data.error, icon: 'error'});
        }
        setLoading(false);
    }

    const ownerTableInit = async () => {
        setLoading(true)
        const URL = '/master';

        try {
            const res = await client.get(URL);
            // 받아온 결과에 id값 추가
            const massage = res.data.reduce((acc: masterMainType2[], val: masterMainType2, idx: number) => {
                let temp: string = '';
                switch (`${val.o_approval}`) {
                    case '0':
                        temp = '입점승인 대기중';
                        break;
                    case '1':
                        temp = '입점승인 완료';
                        break;
                    case '2':
                        temp = '입점승인 거절';
                        break;
                    case '3':
                        temp = '해지승인 대기중';
                        break;
                    case '4':
                        temp = '해지승인 완료';
                        break;
                    default:
                        break;
                }
                const event = new Date(val.o_date);

                if (val.o_date) {
                    const event = new Date(val.o_date);
                    acc.push({
                        ...val,
                        id: val.o_sNumber,
                        o_approval: temp,
                        o_date: event.toLocaleDateString("ko-KR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        })
                    })
                } else {
                    acc.push({
                        ...val,
                        id: val.o_sNumber,
                        o_approval: temp,
                        o_date: ' --- '
                    })
                }

                return acc;
            }, []);
            setRows(massage);


        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            } else {
                alert('데이터를 가져오는 중 에러가 발생했습니다.\n잠시후 다시 시도 바랍니다.');
            }
        }
        setLoading(false);
    };

    const updateDB = async (input: string) => {
        setLoading(true);
        if (selected.length === 0) {
            fireSweetAlert({title: '선택된 줄이 없습니다',icon: 'info'});
            setLoading(false);
            return false;
        }

        if (input === 'ok') if (!window.confirm('승인하시겠습니까?')) {
            setLoading(false);
            return false;
        }
        if (input === 'no') if (!window.confirm('반려하시겠습니까?')) {
            setLoading(false);
            return false;
        }
        const URL = '/master/requestOK';

        const data = {
            checkStatus: input, // 'ok' 아니면 'no'
            selectedRow: selected, // ['6564654', '54654654']
        }

        try {
            const res = await client.patch(URL, data);
            ownerTableInit();
            fireSweetAlert({title: '선택된 가맹점 신청 승인/반려 완료 되었습니다.', icon: 'success'});
        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error, icon: 'error'});
            } else {
                alert('예상치 못한 에러로 인해 작업이 취소되었습니다.\n잠시후 다시 시도해주세요');
            }
        }
        setLoading(false);

    };

    const columns: GridColDef[] = [
        {field: 'o_approval', headerName: '상태', width: 150},
        {field: 'o_sNumber', headerName: 'SN', width: 150},
        {field: 'o_name', headerName: '가게명', width: 180},
        {field: 'o_phone', headerName: '전화번호', width: 150,},
        {field: 'o_cellPhone', headerName: '휴대전화', width: 150},
        {field: 'o_address', headerName: '가게주소', width: 150},
        {field: 'o_latitude', headerName: '위도', width: 130},
        {field: 'o_longitude', headerName: '경도', width: 130},

        {field: 'o_date', headerName: '가입일', width: 180},

        {field: 'o_time1', headerName: '영업시작', width: 150},
        {field: 'o_time2', headerName: '영업종료', width: 150},
        {field: 'o_image', headerName: '이미지주소', width: 150},
    ]; // 그리드 설정

    return (
        <MasterMain authReducer={authReducer} updateDB={updateDB} loading={loading} setSelected={setSelected}
                    rows={rows} columns={columns} setLoginForm={setLoginForm} loginForm={loginForm} login={login}/>
    )
}