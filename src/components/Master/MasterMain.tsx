import React, {useState} from 'react';
import {DataGrid, GridColDef, GridRowId} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {client} from "../../lib/api/client";

export default function MasterMain() {

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

    const [rows, setRows] = useState(initialValue);
    const [selected, setSelected] = useState<GridRowId[]>([]);
    const [master, setMaster] = useState(false);
    const [loginForm, setLoginForm] = useState({m_id: '', m_pw: ''});

    const login = async () => {

        const URL = '/master/masterlogin';
        const res = await client.post(URL, loginForm);
        console.log(res);

        // 마스터 로그인 성공시
        if (true) {
            setMaster(true);
            initialize();
        }

    }

    const initialize = async () => {
        // 리스트 불러오는 코드

        // setRows([
        //         {
        //             id: '1234567890',
        //             o_approval: '0',
        //             o_sNumber: '1234567890',
        //             o_phone: '01040650803',
        //             o_name: '가게이름',
        //             o_cellPhone: '05140650803',
        //             o_address: '부산시 해운대구 해운대로 265',
        //             o_latitude: '100.000000',
        //             o_longitude: '200.200000',
        //             o_date: '',
        //             o_time1: '07:00',
        //             o_time2: '19:00',
        //             o_image: 'ㅇㅁㄹㅇㄴㄹㅇㄴㅁㄹㅇㄴㄹㅁㅇㄴㄹㅇㄴㅁㄹㄴㅇㄹㅇㄴㄹㄴㅇㅁㄹㄴㅇㅁㄹㅇㄴㄹㅇㄹㄴㅁ',
        //         },
        //         {
        //             id: '1234567891',
        //             o_approval: '0',
        //             o_sNumber: '1234567890',
        //             o_phone: '01040650803',
        //             o_name: '가게이름',
        //             o_cellPhone: '05140650803',
        //             o_address: '부산시 해운대구 해운대로 265',
        //             o_latitude: '100.000000',
        //             o_longitude: '200.200000',
        //             o_date: '',
        //             o_time1: '07:00',
        //             o_time2: '19:00',
        //             o_image: 'ㅇㅁㄹㅇㄴㄹㅇㄴㅁㄹㅇㄴㄹㅁㅇㄴㄹㅇㄴㅁㄹㄴㅇㄹㅇㄴㄹㄴㅇㅁㄹㄴㅇㅁㄹㅇㄴㄹㅇㄹㄴㅁ',
        //         },
        //         {
        //             id: '1234567892',
        //             o_approval: '0',
        //             o_sNumber: '1234567890',
        //             o_phone: '01040650803',
        //             o_name: '가게이름',
        //             o_cellPhone: '05140650803',
        //             o_address: '부산시 해운대구 해운대로 265',
        //             o_latitude: '100.000000',
        //             o_longitude: '200.200000',
        //             o_date: '',
        //             o_time1: '07:00',
        //             o_time2: '19:00',
        //             o_image: 'ㅇㅁㄹㅇㄴㄹㅇㄴㅁㄹㅇㄴㄹㅁㅇㄴㄹㅇㄴㅁㄹㄴㅇㄹㅇㄴㄹㄴㅇㅁㄹㄴㅇㅁㄹㅇㄴㄹㅇㄹㄴㅁ',
        //         },
        //     ]
        // )
    };

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
        {field: 'o_approval', headerName: '상태', width: 130},
        {field: 'o_sNumber', headerName: 'SN', width: 150},
        {field: 'o_name', headerName: '가게명', width: 150},
        {field: 'o_phone', headerName: '전화번호', width: 150,},
        {field: 'o_cellPhone', headerName: '휴대전화', width: 150},
        {field: 'o_address', headerName: '가게주소', width: 150},
        {field: 'o_latitude', headerName: '위도', width: 130},
        {field: 'o_longitude', headerName: '경도', width: 130},
        {field: 'fullName', headerName: '가입일', width: 150},
        {field: 'o_time1', headerName: '영업시작', width: 150},
        {field: 'o_time2', headerName: '영업종료', width: 150},
        {field: 'o_image', headerName: '이미지주소', width: 150},
    ]; // 그리드 설정

    return (
        <>
            {master ? <>
                    <div style={{height: 400, width: '100%', margin: 'auto'}}>
                        <DataGrid
                            onStateChange={({selection}) => setSelected(selection)}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                    <Button variant="contained" color="success" onClick={() => updateDB('ok')}>
                        승인
                    </Button>
                    {' '}
                    <Button variant="outlined" color="error" onClick={() => updateDB('no')}>
                        반려
                    </Button>
                </>
                :
                <>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField id="outlined-basic" label={'아이디'}
                                   variant="outlined" name={'u_id'}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   onChange={e => setLoginForm({...loginForm, m_id: e.target.value})}
                        />

                        <TextField id="outlined-basic" type='password' label="비밀번호" variant="filled" name={'u_pw'}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <VpnKeyIcon/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   onChange={e => setLoginForm({...loginForm, m_pw: e.target.value})}/>
                        <Button onClick={login}>로그인</Button>
                    </Box>
                </>
            }

        </>
    )
}
