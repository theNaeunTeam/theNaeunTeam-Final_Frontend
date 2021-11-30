import React, {useState} from "react";
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
        formValidate(tagName);
    }

    const formValidate = (tagName: string) => {
        if (regForm.u_id.length < 5) {
            setFormError({...formError, [tagName]: true});
            return false;
        } else {
            setFormError({...formError, [tagName]: false});
            // 서버로 아이디를 보내는 코드
        }
    };


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
        <div style={{border: 'none', marginLeft: '200px', marginRight: '200px', marginTop: '10px', padding: '100px'}}>
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
                <div><h3>회원가입</h3></div>
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

                <div style={{width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'space-between'}}>
                    <span>
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
                    <span>
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup row aria-label="gender" name={'u_gender'}>
                        <FormControlLabel id={'u_gender'} value="남성" control={<Radio/>} defaultChecked={true}
                                          label="남성"/>
                        <FormControlLabel id={'u_gender'} value="여성" control={<Radio/>} label="여성"/>
                    </RadioGroup>
                        </span>
                </div>
                <Button style={{width: '100%'}} variant="outlined" onClick={submitForm}>
                    회원가입
                </Button>
            </Stack>
        </div>
    )
}

