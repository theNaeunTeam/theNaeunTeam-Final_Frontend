import React, {useEffect, useLayoutEffect, useState} from 'react';
import {masterMainType2} from "../../lib/types";
import {GridColDef, GridRowId} from "@mui/x-data-grid";
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import '../../lib/styles/masterOwnerDash.scss'
import TerminationCompletion from "../../components/Master/TerminationCompletion";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function TerminationCompletionContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
    }, []);
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 해지신청리스트 불러오는 함수()
        ownerTableInit();
    }, []);

    const ownerTableInit = async () => {

        const URL = '/master/terminationcompletion';

        try {
            const res = await client.get(URL);
            // 받은 결과에 id값 추가
            const message = res.data.reduce((acc: masterMainType2[], val: masterMainType2) => {
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

                // @ts-ignore
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
                return acc;
            }, [])

            setRows(message);

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

        if (selected.length === 0) fireSweetAlert({title: '가게 선택이 되지 않았습니다.',icon: 'info'});

        const URL = '/master/terminationcancle';

        const data =
            {
                checkStatus: input,
                selectedRow: selected,
            }

        try {
            const res = await client.patch(URL, data);
            ownerTableInit();
            fireSweetAlert({title: '선택된 가맹점 해지 취소 완료 되었습니다.',icon: 'info'});
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
        {field: 'o_approval', headerName: '상태', width: 130},
        {field: 'o_sNumber', headerName: 'SN', width: 150},
        {field: 'o_name', headerName: '가게명', width: 150},
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
        <TerminationCompletion loading={loading} updateDB={updateDB} setSelected={setSelected} rows={rows}
                               columns={columns}/>
    );
}

