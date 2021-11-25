import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {masterMainType2} from "../../modules/types";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {client} from "../../lib/api/client";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";


// 입점 승인완료
export default function ApprovalCompletion() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.push('/err');
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
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const updateDB = async (input: string) => {

        if (selected.length === 0) alert('가게선택이 되지않았습니다');

        const URL = '/master/requestOK';

        const data =
            {
                checkStatus: input, // OK or NO
                selectedRow: selected, // 선택한 가게
            }

        try {
            const res = await client.patch(URL, data);
            console.log(res);
            ownerTableInit();
            alert('데이터 갱신 완료');
        } catch (e) {
            console.log(e);
            alert('데이터 갱신 실패');
        }
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
        <>
            <h3>입점신청 승인완료 </h3>
            <div style={{height: 400, width: '100%', margin: 'auto'}}>
                {loading ?
                    <Box sx={{width: 1500}}>
                        <Skeleton/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation='pulse'/>
                        <Skeleton/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation='pulse'/>
                        <Skeleton/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation='pulse'/>
                        <Skeleton/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation='pulse'/>
                        <Skeleton/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation='pulse'/>
                    </Box>
                    :
                    <DataGrid
                        onStateChange={({selection}) => setSelected(selection)}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                }
            </div>

            <Button variant="contained" color="error" onClick={() => updateDB('no')}>
                반려
            </Button>
        </>
    )
}
