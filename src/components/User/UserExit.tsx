/* eslint-disable */
import React, {useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import Stack from "@mui/material/Stack";
import UserNavbar from "./UserNavbar";
import {useDispatch} from "react-redux";


const DivContainer = styled.div`
  //border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  //border: solid blue;
  width: 17%;
  min-height: 1000px;
  font-size: 20px;
`;
const DivMain = styled.div`
  //border: solid red;
  width: 80%;
  height: 100%;
  text-align: center;
  min-height: 800px;
  padding: 20px;
  margin-right: 15%;
`;
export default function UserExit() {

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);

    const initPassword = {
        u_pw: ''
    }

    const [userForm, setUserForm] = useState(initPassword);
    const dispatch = useDispatch();


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // DB 비밀번호 유효성 검사 + 탈퇴결과
    const submitForm = async () => {
        const URL = '/user/userDelete'
        console.log('입력한 회원탈퇴 비밀번호 ');
        console.log(userForm.u_pw);
        const data = {
            u_pw: userForm.u_pw,
        }
        try {
            const res = await client.post(URL, userForm);
            console.log(res.data);
            res.data === 1
                ? (alert('회원 탈퇴 되었습니다.'), dispatch({type: 'logoutAll'}), history.push('/'))
                : alert('회원 탈퇴 실패하였습니다.')
        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')
            } else if (e.response.status === 400) {
                alert(e.response.data.error);
            } else {
                alert('예상치 못한 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.')
            }

        }
    };


    return (
        <DivContainer>
            <DivNav>
                <UserNavbar/>
            </DivNav>
            <DivMain>
                <h1 style={{marginBottom: '50px'}}>회원탈퇴</h1>
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
                    className='editForm'
                >

                    <TextField
                        required
                        id="outlined-required"
                        label="패스워드를 입력하세요."
                        type={'password'}
                        name={'u_pw'}
                    />

                    <Button style={{width: '15%', margin: '20px', border: 'solid'}} variant="outlined"
                            onClick={submitForm}>
                        확인
                    </Button>
                </Stack>
            </DivMain>
        </DivContainer>
    )
}
