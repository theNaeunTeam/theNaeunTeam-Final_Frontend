import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {Button} from "@mui/material";
import {client} from "../../lib/api/client";

export default function UserRegisterForm() {

    const initValue = {
        u_id: '',
        u_pw: '',
        pwConfirm: '',
        u_cellPhone: '',
        u_email: '',
        emailConfirm: '',
        u_gender: '남성',
        u_age: '',
    };

    const formErrorinit = {
        u_id: false,
        u_pw: false,
        pwConfirm: false,
        u_cellPhone: false,
        u_email: false,
        emailConfirm: false,
        u_gender: false,
        u_age: false,
    }

    const [regForm, setRegForm] = useState(initValue);
    const [formError, setFormError] = useState(formErrorinit);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
        formValidate();
    }

    const formValidate = () => {
        if (regForm.u_id.length < 6) {
            setFormError({...formError, u_id: true});
            return false;
        } else {
            setFormError({...formError, u_id: false});
            // 서버로 아이디를 보내는 코드
        }
    };

    const submitForm = async () => {
        const URL = '/auth/userjoin'
        try {
            const res = await client.post(URL, regForm);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Box
                onChange={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 3, width: '50ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        error={formError.u_id}
                        required
                        id="outlined-required"
                        label="아이디"
                        helperText="5글자 이상 입력해주세요"
                        name={'u_id'}
                    />
                    <TextField
                        error={formError.u_cellPhone}
                        required
                        id="outlined-required"
                        label="휴대전화"
                        helperText="하이픈 없이 입력해 주세요"
                        name={'u_cellPhone'}
                    />
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
                    <TextField
                        error={formError.u_email}
                        required
                        id="outlined-required"
                        label="이메일"
                        name={'u_email'}
                    />
                    <TextField
                        error={formError.emailConfirm}
                        required
                        id="outlined-required"
                        label="이메일 확인"
                        name={'emailConfirm'}
                    />

                    <div style={{width: '30%', margin: 'auto'}}>
                        <FormLabel component="legend">성별</FormLabel>
                        <RadioGroup row aria-label="gender" name={'u_gender'}>
                            <FormControlLabel id={'u_gender'} value="남성" control={<Radio/>} defaultChecked={true}
                                              label="남성"/>
                            <FormControlLabel id={'u_gender'} value="여성" control={<Radio/>} label="여성"/>
                        </RadioGroup>
                        나이
                        <select name={'u_age'} style={{width: '50%'}}>
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
                            회원가입
                        </Button>
                    </div>
                </div>
            </Box>
        </>
    )
}
