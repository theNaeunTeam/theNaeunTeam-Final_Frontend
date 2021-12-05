import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {masterMainType2} from "../../lib/types";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import '../../styles/masterOwnerDash.scss'

// 입점 승인완료
export default function ApprovalCompletion() {
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
        // 입청승인완료 리스트 불러오는 함수()
        ownerTableInit();
    }, []);

    const ownerTableInit = async () => {

        const URL = '/master/approvalCompletion';

        try {
            const res = await client.get(URL);
            console.log(URL);
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

                acc.push({
                    ...val,
                    id: val.o_sNumber,
                    o_approval: temp,
                    o_date: new Date(val.o_date).toLocaleDateString("ko-KR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }),
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
            console.log(e);
        }
        setLoading(false);
    };


    const columns: GridColDef[] = [
        {field: 'o_approval', headerName: '상태', width: 150},
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
        <>
            <h3 className='mainH3'>입점신청 승인완료 </h3>
            <div style={{height: 650, width: '100%', margin: 'auto'}}>
                {
                    <DataGrid
                        onStateChange={({selection}) => setSelected(selection)}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        style={{
                            fontSize: 'large',
                            fontFamily: 'Chosunilbo_myungjo',
                            fontWeight: 'bold',
                            color: 'black'
                        }}
                    />
                }
            </div>
        </>
    )
}
