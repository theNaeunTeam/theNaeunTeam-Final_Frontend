import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import styled from "styled-components";

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

export default function Unsubscribe(props: { handleForm: any; submitForm: any; }) {

    const {
        handleForm,
        submitForm,
    } = props;

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