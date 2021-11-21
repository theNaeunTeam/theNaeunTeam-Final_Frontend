/* eslint-disable */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const TableStyled = styled.table`
      padding: 30px;
      margin: auto;
      width: 80%;
    `;

const DivContainer = styled.div`
      text-align: center;
    `;

export default function UserEdit() {

    const initValue = {
        u_id: '',
        u_pw:'',
        pwConfirm:'',
        u_cellPhone: '',
        u_email: '',
        u_gender: '',
        u_age: '',
    };

    const email = {
        u_email:''
    }

    const formErrorinit = {
        u_id: false,
        u_pw: false,
        pwConfirm: false,
        u_cellPhone: false,
        u_email: false,
        u_gender: false,
        u_age: false,
    }

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!authReducer.isUser) history.push('/err');
    }, []);


    const [userForm, setUserForm] = useState(initValue);
    const [formError, setFormError] = useState(formErrorinit);
    const [userEmail, setUserEmail] = useState(email);

    const formValidate = (tagName: string) => {
        if (userForm.u_id.length < 6) {
            setFormError({...formError, [tagName]: true});
            return false;
        } else {
            setFormError({...formError, [tagName]: false});
            // 서버로 아이디를 보내는 코드
        }
    };

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value});
        formValidate(tagName);
    }

    // 유저 정보 업데이트
    const submitForm = async () => {
        const URL = '/user/userUpdate'
        console.log(userForm);
        try {
            const res = await client.post(URL, userForm);
            console.log(res.data);
            res.data === 1
            ? (alert('수정이 완료되었습니다.'), history.goBack())
            : (alert('수정이 실패했습니다.'), history.goBack())
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        userData();
    },[])

    // 유저 데이터 가져오기
    const userData = async ()=>{
        const URL = '/user/userData';
        try {
            const res = await  client.get(URL);
            console.log(res);
            setUserForm(res.data);
            setUserEmail(res.data);
        } catch (e){
            console.log(e);
        }
    };


    return (
        <DivContainer>
            <h2>회원정보수정</h2>
            <Stack
                onChange={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 3, width: '50ch'},
                }}
                noValidate
                autoComplete="off"
                alignItems={"center"}
            >
                <TextField
                    required
                    id="outlined-required"
                    label="아이디"
                    name={'u_id'}
                    value={userForm.u_id}
                    // disabled={true}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    error={formError.u_pw}
                    required
                    id="outlined-required"
                    label="변경할 패스워드"
                    type={'password'}
                    name={'u_pw'}
                />
                <TextField
                    error={formError.pwConfirm}
                    required
                    id="outlined-required"
                    label="패스워드 확인"
                    type={'password'}
                    name={'pwConfirm'}
                />
                <TextField
                    error={formError.u_cellPhone}
                    required
                    id="outlined-required"
                    label="휴대전화"
                    helperText="하이픈 없이 입력해 주세요"
                    name={'u_cellPhone'}
                    value={userForm.u_cellPhone}
                    InputProps={{
                        readOnly: false,
                    }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="이메일"
                    value={userEmail.u_email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    error={formError.u_email}
                    required
                    id="outlined-required"
                    label="변경할 이메일"
                    name={'u_email'}
                />

                <div style={{width: '30%', margin: 'auto'}}>
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup row aria-label="gender" name={'u_gender'} value={userForm.u_gender}>
                        <FormControlLabel id={'u_gender'} value="남성" control={<Radio/>} defaultChecked={true}
                                          label="남성"/>
                        <FormControlLabel id={'u_gender'} value="여성" control={<Radio/>} label="여성"/>
                    </RadioGroup>
                    나이
                    <select name={'u_age'} style={{width: '50%'}} value={userForm.u_age} >
                        <option>AGE</option>
                        <option value="10">10대</option>
                        <option value="20">20대</option>
                        <option value="30">30대</option>
                        <option value="40">40대</option>
                        <option value="50">50대</option>
                        <option value="60">60대</option>
                        <option value="70">70대</option>
                        <option value="80">80대</option>
                        <option value="90">90대</option>
                    </select>

                    <Button style={{width: '100%'}} variant="outlined" onClick={submitForm}>
                        정보 수정
                    </Button>
                </div>
            </Stack>
        </DivContainer>
    )
}
