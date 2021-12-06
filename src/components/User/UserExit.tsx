import React from "react";
import UserNavbar from "./UserNavbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import styled from "styled-components";

const DivContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  width: 17%;
  min-height: 1000px;
  font-size: 20px;
`;
const DivMain = styled.div`
  width: 80%;
  height: 100%;
  text-align: center;
  min-height: 800px;
  padding: 20px;
  margin-right: 15%;
`;

export default function UserExit(props: { handleForm: any; submitForm: any; }) {
    const {
        handleForm,
        submitForm
    } = props;

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