import React, {useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {client} from "../../lib/api/client";

const DivContainer = styled.div`
  //border: solid black;
  //display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
  text-align: center;
`;


export default function Unsubscribe() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const initPassword = {
        o_pw: ''
    }
    const [ownerForm, setOwnerForm] = useState(initPassword);


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setOwnerForm({...ownerForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // DB 비밀번호 유효성 검사 + 탈퇴결과
    const submitForm = async () => {
        const URL = '/owner/ownerExit'
        console.log('입력한 탈퇴 비밀번호 ');
        console.log(ownerForm);
        const data = {
            o_pw: ownerForm.o_pw,
        }

        try {
            const res = await client.post(URL, data);

            console.log(res.data);
            if (res.data === 1) {
                alert("가맹 해지 신청이 완료 되었습니다.")
            } else {
                alert("가맹 해지 신청에 실패하였습니다.")
            }

        } catch (e: any) {
            const err = e.response;
            if (err.data.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');

            } else if (err.data.status === 400) {
                alert(err.data.error);
            } else {
                alert('예상치 못한 에러로 인해 가맹 해지 신청에 실패하였습니다.\n잠시 후 다시 시도 바랍니다.')
            }
        }
    };

    return (
        <DivContainer>
            <h1 style={{marginBottom: '50px'}}>이용해지신청</h1>
            <h3>비밀번호 확인</h3>

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
                    name={'o_pw'}
                    style={{width: '23%'}}
                />

                <Button style={{width: '10%'}} variant="outlined" onClick={submitForm}>
                    확인
                </Button>
            </Stack>
        </DivContainer>
    )
}
