import React, {useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridRowId} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {client} from "../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {masterMainType, masterMainType2} from "../../modules/types";
import Skeleton from '@mui/material/Skeleton';

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

    const [rows, setRows] = useState<masterMainType2[]>(initialValue);
    const [selected, setSelected] = useState<GridRowId[]>([]);
    const [loginForm, setLoginForm] = useState({m_id: '', m_pw: ''}); // 마스터 로그인 폼 핸들러
    const [loading, setLoading] = useState(true);

    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authReducer.isMaster) ownerTableInit();
    }, []);

    const login = async () => {

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
            alert('아이디/비밀번호를 확인해주세요');
            console.log(e);
        }

    }

    const ownerTableInit = async () => {

        const URL = '/master';

        try {
            const res = await client.get(URL);
            console.log(URL);
            // 받아온 결과에 id값 추가
            const massage = res.data.reduce((acc: masterMainType2[], val: masterMainType2, idx: number) => {
                let temp:string = '';
                switch (`${val.o_approval}`) {
                    case '0': temp = '입점승인 대기중';
                        break;
                    case '1': temp = '입점승인 완료';
                        break;
                    case '2': temp = '입점승인 거절';
                        break;
                    case '3': temp = '해지승인 대기중';
                        break;
                    case '4': temp = '해지승인 완료';
                        break;
                    default: break;
                }
                const event = new Date(val.o_date);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                // @ts-ignore
                acc.push({...val, id: val.o_sNumber, o_approval:temp, o_date:event.toLocaleDateString(undefined, options)})
                return acc;
            }, []);
            console.log(massage);
            setRows(massage);

            // const event = new Date(`${rows[0].o_date}`);
            // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // // @ts-ignore
            // console.log(event.toLocaleDateString(undefined, options));

            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const updateDB = async (input: string) => {

        if (selected.length === 0) alert('선택된 줄이 없습니다');
        if (input === 'ok') if (!window.confirm('승인?')) return false;
        if (input === 'no') if (!window.confirm('반려?')) return false;

        const URL = '/master/requestOK';

        const data =
            {
                checkStatus: input, // 'ok' 아니면 'no'
                selectedRow: selected, // ['6564654', '54654654']
            }

        try {
            const res = await client.patch(URL, data);
            console.log(res);
            ownerTableInit();
            alert('데이터 갱신 완료');
        } catch (e) {
            console.log(e);
            alert('데이터 갱신 실패')
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
            {authReducer.isMaster ?
                <>
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
                    <Button variant="contained" color="success" onClick={() => updateDB('ok')}>
                        승인
                    </Button>
                    {' '}
                    <Button variant="contained" color="error" onClick={() => updateDB('no')}>
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
                                   onChange={e => setLoginForm({...loginForm, m_pw: e.target.value})}
                                   onKeyPress={e => {
                                       if (e.key === 'Enter') login();
                                   }
                                   }/>
                        <Button onClick={login}>로그인</Button>
                    </Box>
                </>
            }

        </>
    )
}
