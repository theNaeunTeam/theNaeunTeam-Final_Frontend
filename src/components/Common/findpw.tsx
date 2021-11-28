import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {client} from "../../lib/api/client";
import Stack from '@mui/material/Stack';
import {useRouteMatch} from "react-router";
import axios from "axios";


export default function FindPw() {
    // 파라미터로 넘어오는 id와 token(pw) 번호 저장
    // token의 가를 다시 /로 replace 하고 그거로 요청 보내서 유효한 요청인지 먼저 확인

    interface params {
        id: string,
        token: string;
    }

    const match = useRouteMatch<params>();

    useEffect(() => {
        const URL = '/common/changePWcheck';
        const pw = match.params.token.replace(/가/gi, "/");

        try {
            axios.post(URL, {
                u_id: match.params.id,
                u_pw: pw,
            })
                .then(response => {
                    console.log(response.data)
                    console.log(response.data== "")
                    // 해당 정보가 없을 경우
                    if (response.data == "") {
                        alert("유효한 접속이 아닙니다.")
                        setTimeout(function () {
                            window.location.replace('about:blank')
                        }, 1000);
                    }
                })
                .catch(error => {
                    alert("유효한 접속이 아닙니다.")
                    setTimeout(function () {
                        window.location.replace('about:blank')
                    }, 1000);
                })
        } catch (e) {
            console.log(e);
        }

    }, [])
    const initValue = {
        u_pw: '',
        pwConfirm: '',
    };
    const formErrorinit = {
        u_pw: false,
        pwConfirm: false,
    };
    const [regForm, setRegForm] = useState(initValue);
    const [formError, setFormError] = useState(formErrorinit);


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
        formValidate(tagName);
    }
    const formValidate = (tagName: string) => {
        if (regForm.u_pw === regForm.pwConfirm) {
            setFormError({...formError, [tagName]: false});
        } else {
            setFormError({...formError, [tagName]: true});
            return false;
        }
    }

    const submitForm = async () => {
        const pw = match.params.token.replace(/가/gi, "/");
        const URL = '/common/changePW'
        const data = {
            u_id: match.params.id,
            u_pw: pw,
        }
        try{
            const res = await client.patch(URL, data);
            alert("비밀번호 변경 성공하였습니다.");
        }catch (e){
            console.log(e);
            alert("비밀번호 변경 실패하였습니다.");
        }


    };

    return (
        <>
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
        </>
    )
}