import React, {useEffect, useLayoutEffect, useState} from 'react';
import {GridColDef, GridRowId} from "@mui/x-data-grid";
import {client} from "../../lib/api/client";
import '../../lib/styles/masterOwnerDash.scss'
import {useHistory} from "react-router-dom";
import MasterUserList from "../../components/Master/MasterUserList";

export default function MasterUserListContainer() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userALL();
    }, [])

    const userALL = async () => {
        setLoading(true);
        // 리스트 불러오는 URL
        const URL = '/master/userList';
        try {
            const res = await client.get(URL);
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
            setRows(message);

        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            } else {
                alert('데이터 가져오는 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            }
        }
        setLoading(false);
    }


    const columns: GridColDef[] = [
        {field: 'u_id', headerName: '유저아이디', width: 200},
        {field: 'u_pw', headerName: '유저패스워드', width: 300},
        {field: 'u_cellPhone', headerName: '휴대폰번호', width: 180},
        {field: 'u_email', headerName: '이메일', width: 250,},
        {field: 'u_gender', headerName: '성별', width: 180},
        {field: 'u_age', headerName: '나이', width: 180},
        {field: 'u_status', headerName: '유저상태', width: 180},
        {field: 'u_noShowCnt', headerName: 'NoShow', width: 160},
    ]; // 그리드 설정

    return (
        <MasterUserList loading={loading} setSelected={setSelected} rows={rows} columns={columns}/>
    )
}
