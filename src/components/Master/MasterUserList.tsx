import React, {useEffect, useLayoutEffect, useState} from 'react';
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import {client} from "../../lib/api/client";
import '../../styles/masterOwnerDash.css'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {useHistory} from "react-router-dom";
import '../../styles/masterOwnerDash.css'

export default function MasterUserList() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.push('/err');
    }, []);
    const initialValue = [{
        id: '',
        u_id: '',
        u_pw: '',
        u_cellPhone: '',
        u_email: '',
        u_gender: '',
        u_age: '',
        u_status: '',
        u_noShowCnt: '',
    }];

    type initialType = {
        id: String,
        u_id: String,
        u_pw: String,
        u_cellPhone: String,
        u_email: String,
        u_gender: String,
        u_age: String,
        u_status: String,
        u_noShowCnt: String,
    }

    const [rows, setRows] = useState<initialType[]>(initialValue);
    const [selected, setSelected] = useState<GridRowId[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userALL();
    }, [])

    const userALL = async () => {
        // 리스트 불러오는 URL
        const URL = '/master/userList';
        try {
            const res = await client.get(URL);
            // console.log(res.data);
            const message = res.data.reduce((acc: initialType[], val: initialType) => {
                let temp: string = '';
                switch (`${val.u_status}`) {
                    case '0':
                        temp = '정상';
                        break;
                    case '1':
                        temp = '탈퇴';
                        break;
                    case '2':
                        temp = '블랙리스트';
                        break;
                    default:
                        break;
                }
                acc.push({...val, id: val.u_id, u_status: temp})
                return acc;
            }, [])
            console.log(message);
            setRows(message);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }


    const updateDB = async (input: string) => {
        if (selected.length === 0) return false;
        console.log(selected); // 사업자 번호가 문자열 배열로 들어옴
        let URL = '';

        const data =
            {
                checkStatus: input, // OK or NO
                selectedRow: selected, // 선택한 유저
            }

        try {
            const res = await client.patch(URL, data);
            console.log(res);
            userALL();
            alert('데이터 갱신 완료');
        } catch (e) {
            console.log(e);
            alert('데이터 갱신 실패');
        }

        // selected를 백엔드로 전송하는 코드
    };

    const columns: GridColDef[] = [
        {field: 'u_id', headerName: '유저아이디', width: 180},
        {field: 'u_pw', headerName: '유저패스워드', width: 200},
        {field: 'u_cellPhone', headerName: '휴대폰번호', width: 180},
        {field: 'u_email', headerName: '이메일', width: 180,},
        {field: 'u_gender', headerName: '성별', width: 180},
        {field: 'u_age', headerName: '나이', width: 180},
        {field: 'u_status', headerName: '유저상태', width: 180},
        {field: 'u_noShowCnt', headerName: 'NoShow', width: 160},
    ]; // 그리드 설정

    return (
        <>
            <h3 className='mainH3'> 회원 리스트 </h3>
            <div className='MasterMainBtn'>
                <Button variant="contained" color="error" onClick={() => updateDB('yes')}>
                    수정
                </Button>
                {' '}
                <Button variant="contained" color="error" onClick={() => updateDB('no')}>
                    삭제
                </Button>
            </div>
            <div style={{height: 650, width: '100%', margin: 'auto'}}>
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
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                }
            </div>



        </>
    )
}
