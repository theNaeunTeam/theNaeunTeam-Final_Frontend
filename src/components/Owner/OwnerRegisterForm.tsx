import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import {Button} from "@mui/material";
import {client} from "../../lib/api/client";

export default function OwnerRegisterForm() {

    const initValue = {
        o_sNumber: '',
        o_pw: '',
        pwConfirm: '',
        o_phone: '',
        o_name: '',
        o_cellPhone: '',
        o_address: '',
    };
    const errorInit = {
        o_sNumber: false,
        o_pw: false,
        pwConfirm: false,
        o_phone: false,
        o_name: false,
        o_cellPhone: false,
        o_address: false,
    }

    const [regForm, setRegForm] = useState(initValue);
    const [formError, setFormError] = useState(errorInit);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(regForm);
        const tagName = (e.target as HTMLFormElement).name;
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    const submitForm = async () => {
        const URL = ''
        try {
            const res = await client.post(URL, regForm);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Box
                onChange={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        error={formError.o_sNumber}
                        required
                        id="outlined-required"
                        label="사업자번호"
                        name={'o_sNumber'}
                    />
                    <TextField
                        error={formError.o_pw}
                        required
                        id="outlined-required"
                        label="패스워드"
                        type={'password'}
                        name={'o_pw'}
                    />
                    <TextField
                        error={formError.pwConfirm}
                        required
                        id="outlined-required"
                        label="패스워드확인"
                        type={'password'}
                        name={'pwConfirm'}
                    />
                    <TextField
                        error={formError.o_phone}
                        required
                        id="outlined-required"
                        label="가게 대표 번호"
                        helperText="하이픈 없이 입력해 주세요"
                        name={'o_phone'}
                    />
                    <TextField
                        error={formError.o_cellPhone}
                        required
                        id="outlined-required"
                        label="사장님 전화번호"
                        helperText="하이픈 없이 입력해 주세요"
                        name={'o_cellPhone'}
                    />
                    <TextField
                        error={formError.o_address}
                        required
                        id="outlined-required"
                        label="가게 주소"
                        helperText="매장 주소(상세주소 포함)를 입력해 주세요"
                        name={'o_address'}
                    />
                </div>

                <Button variant="outlined" onClick={submitForm}>
                    회원가입
                </Button>

            </Box>
        </>
    )
}
