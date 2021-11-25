/* eslint-disable */
import React, {useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import Stack from "@mui/material/Stack";

const TableStyled = styled.table`
  padding: 30px;
  margin: auto;
  width: 80%;
`;

const DivContainer = styled.div`
  text-align: center;
`;


export default function UserExit() {

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.push('/err');
    }, []);

    const initPassword = {
        u_pw: ''
    }

    const [userForm, setUserForm] = useState(initPassword);


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // DB 비밀번호 유효성 검사 + 탈퇴결과
    const submitForm = async () => {
        const URL = '/user/userDelete'
        console.log('입력한 회원탈퇴 비밀번호 ');
        console.log(userForm.u_pw);
        try {
            const res = await client.post(URL, userForm);
            console.log(res.data);
            res.data === true
                ? (alert('회원 탈퇴 되었습니다.'), history.push('/'))
                : alert('비밀번호가 맞지않습니다.')
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <DivContainer>
            <h2>회원탈퇴</h2>
            <h3>비밀번호 확인 </h3>
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
                    label="패스워드를 입력하세요."
                    type={'password'}
                    name={'u_pw'}
                />

                <Button style={{width: '30%'}} variant="outlined" onClick={submitForm}>
                    확인
                </Button>
            </Stack>
        </DivContainer>
    )
}
