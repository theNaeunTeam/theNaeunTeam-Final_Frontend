import React, {useEffect, useState} from "react";
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {userFormType} from "../../../modules/types";
import {formValidate} from "./formValidate";

const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

export default function UserRegisterForm() {

    const initValue = {
        u_id: '',
        u_pw: '',
        pwConfirm: '',
        u_cellPhone: '',
        u_email: '',
        emailConfirm: '',
        u_gender: '남성',
        u_age: '20',
    };

    const formErrorinit = {
        u_id: false,
        u_pw: false,
        u_cellPhone: false,
        pwConfirm: false,
        u_email: false,
        emailConfirm: false,
        u_gender: false,
        u_age: false,
    }

    const [regForm, setRegForm] = useState<{ [key: string]: string }>(initValue);
    const [formError, setFormError] = useState<userFormType>(formErrorinit);

    useEffect(() => {
        formValidate(regForm, formError, setFormError);
    }, [regForm])

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        if (tagName === 'u_cellPhone') {
            setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value.replace(/[^0-9]/g, '')});
            return false;
        }
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
        // formValidate(tagName);
    }

    // const formValidate = (tagName: string) => {
    //     if (regForm[tagName].length < 5) {
    //         setFormError({...formError, [tagName]: true});
    //         return false;
    //     } else {
    //         setFormError({...formError, [tagName]: false});
    //         // 서버로 아이디를 보내는 코드
    //     }
    // };


    const submitForm = async () => {

        console.log(regForm);

        // const URL = '/common/userjoin'
        // try {
        //     const res = await client.post(URL, regForm);
        //     console.log(res);
        // } catch (e) {
        //     console.log(e);
        // }

    };


    return (
        <div style={{border: 'none', marginLeft: '200px', marginRight: '200px', marginTop: '10px', padding: '10px'}}>
            <Stack
                onChange={(e: React.FormEvent<HTMLFormElement>) => handleFormChange(e)}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 3, width: '50ch'},
                }}
                noValidate
                autoComplete="off"
                alignItems={"center"}
            >
                <div><h3>회원 가입</h3></div>
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
                    value={regForm.u_cellPhone}
                />
                <TextField
                    error={formError.u_pw}
                    required
                    id="outlined-required"
                    label="패스워드"
                    type={'password'}
                    name={'u_pw'}
                    helperText="비밀번호를 입력해주세요"
                />
                <TextField
                    error={formError.pwConfirm}
                    required
                    id="outlined-required"
                    label="패스워드확인"
                    type={'password'}
                    name={'pwConfirm'}
                    helperText="비밀번호를 다시 한 번 입력해주세요"
                />
                <TextField
                    error={formError.u_email}
                    required
                    id="outlined-required"
                    label="이메일"
                    name={'u_email'}
                    helperText="이메일주소를 입력해주세요"
                />
                <TextField
                    error={formError.emailConfirm}
                    required
                    id="outlined-required"
                    label="이메일 확인"
                    name={'emailConfirm'}
                    helperText="이메일주소를 다시 한 번 입력해주세요"
                />

                <div style={{width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                    <span style={{marginLeft: '20px', marginRight: '20px'}}>
                    <InputLabel id="demo-simple-select-label">나이</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={regForm.u_age}
                        label="나이"
                        onChange={e => {
                            setRegForm({...regForm, u_age: e.target.value})
                        }}
                        name={'u_age'}
                    >
                        <MenuItem value={'10'}>10대</MenuItem>
                        <MenuItem value={'20'}>20대</MenuItem>
                        <MenuItem value={'30'}>30대</MenuItem>
                        <MenuItem value={'40'}>40대</MenuItem>
                        <MenuItem value={'50'}>50대</MenuItem>
                        <MenuItem value={'60'}>60대</MenuItem>
                    </Select>
                        </span>
                    <span style={{marginLeft: '20px', marginRight: '20px'}}>
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup row aria-label="gender" name={'u_gender'} defaultValue={'남성'}>
                        <FormControlLabel id={'u_gender'} value="남성" control={<Radio/>} defaultChecked={true}
                                          label="남성"/>
                        <FormControlLabel id={'u_gender'} value="여성" control={<Radio/>} label="여성"/>
                    </RadioGroup>
                        </span>
                </div>
                <Button style={{width: '50%'}} variant="outlined" onClick={submitForm}>
                    회원가입
                </Button>
            </Stack>
        </div>
    )
}

