import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

export default function Findpw(props: {
    handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
    formError: { u_pw: boolean, pwConfirm: boolean };
    submitForm: () => void;
}) {
    const {
        handleForm,
        formError,
        submitForm
    } = props;

    return (
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
                error={formError.u_pw}
                required
                id="outlined-required"
                label="패스워드"
                type={'password'}
                name={'u_pw'}
            />
            <TextField
                error={formError.pwConfirm}
                required
                id="outlined-required"
                label="패스워드확인"
                type={'password'}
                name={'pwConfirm'}
            />
            <div>
                <Button style={{width: '100%'}} variant="outlined" onClick={submitForm}>
                    비밀번호 변경하기
                </Button>
            </div>
        </Stack>
    )
}