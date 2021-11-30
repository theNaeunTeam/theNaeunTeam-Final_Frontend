import React, {useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import OwnerNavbar from "./OwnerNavbar";
import {useHistory} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {client} from "../../lib/api/client";
import {AxiosError} from "axios";

const DivContainer = styled.div`
  border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  border: solid blue;
  width: 17%;
  font-size: large;
`;
const DivMain = styled.div`
  border: solid red;
  width: 80%;
  height: 100%;
  padding: 20px;
`;

export default function Unsubscribe() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.push('/err');
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
            o_pw : ownerForm.o_pw,
        }

        try {
            const res = await client.post(URL, data);

            console.log(res.data);
            if(res.data === 1){
                alert("가맹 해지 신청이 완료 되었습니다.")
            }else{
                alert("해지 신청에 실패하였습니다.")
            }

        } catch (e) {
            // @ts-ignore
            const err = e.response;
            alert(err.data.error);
        }
    };

    return (
        <DivContainer>
            <DivNav>
                <OwnerNavbar/>
            </DivNav>

            <DivMain>
                <h1>이용해지신청</h1>
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
                    />

                    <Button style={{width: '30%'}} variant="outlined" onClick={submitForm}>
                        확인
                    </Button>
                </Stack>
            </DivMain>
        </DivContainer>
    )
}
