import React, {useState} from 'react';
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {client} from "../../lib/api/client";

import Button from "@mui/material/Button";

export default function MasterUserList() {
    const initialValue = [{
        id:'',
        u_id:'',
        u_pw:'',
        u_cellPhone: '',
        u_email: '',
        u_gender: '',
        u_age: '',
        u_status: '',
        u_noShowCnt: '',
    }];

    const [rows, setRows] = useState(initialValue);
    const [selected, setSelected] = useState<GridRowId[]>([]);

    const initialize = async () => {
        // 리스트 불러오는 URL
        const URL = '/master';
        const res = await client.get(URL);
        console.log(res);
    }

    const updateDB = (input: string) => {
        if (selected.length === 0) return false;
        console.log(selected); // 사업자 번호가 문자열 배열로 들어옴
        let URL = '';

        if (input === 'ok') {
            URL = '/master/requestOK';
        } else {
            URL = '';
        }

        // selected를 백엔드로 전송하는 코드
    };

    const columns: GridColDef[] = [
        {field: 'u_id', headerName: '유저아이디', width: 150},
        {field: 'u_pw', headerName: '유저패스워드', width: 170},
        {field: 'u_cellPhone', headerName: '휴대폰번호', width: 150},
        {field: 'u_email', headerName: '이메일', width: 150,},
        {field: 'u_gender', headerName: '성별', width: 150},
        {field: 'u_age', headerName: '나이', width: 150},
        {field: 'u_status', headerName: '유저상태', width: 150},
        {field: 'u_noShowCnt', headerName: 'NoShow', width: 130},
    ]; // 그리드 설정

    return (
        <>
            {
                <div style={{height: 400, width: '100%', margin: 'auto'}}>
                    <DataGrid
                        onStateChange={({selection}) => setSelected(selection)}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                    <Button variant="contained" color="success" onClick={() => updateDB('ok')}>
                        수정
                    </Button>
                    {' '}
                    <Button variant="contained" color="error" onClick={() => updateDB('no')}>
                        삭제
                    </Button>
                </div>
            }
        </>
    )
}
