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
import {client} from "../../../lib/api/client";
import {useHistory} from "react-router-dom";

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

    const history = useHistory();

    const [regForm, setRegForm] = useState<{ [key: string]: string }>(initValue);

    const [u_id, setU_id] = useState(false);
    const [u_pw, setU_pw] = useState(false);
    const [u_cellPhone, setU_cellPhone] = useState(false);
    const [pwConfirm, setPwConfirm] = useState(false);
    const [u_email, setU_email] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [pwCompare, setPwCompare] = useState(false);
    const [emailCompare, setEmailCompare] = useState(false);

    useEffect(() => {
        formValidate();
    }, [regForm]);

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        if (tagName === 'u_cellPhone') {
            setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value.replace(/[^0-9]/g, '')});
            return false;
        }
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    const formValidate = (): boolean => {
        if (regForm.u_id.length < 5) {
            setU_id(true);
            return false;
        }
        setU_id(false);
        if (regForm.u_cellPhone.length < 11) {
            setU_cellPhone(true);
            return false;
        }
        setU_cellPhone(false);
        if (regForm.u_pw.length < 5) {
            setU_pw(true);
            return false;
        }
        setU_pw(false);
        if (regForm.pwConfirm.length < 5) {
            setPwConfirm(true);
            return false;
        }
        setPwConfirm(false);
        if (regForm.u_pw !== regForm.pwConfirm) {
            setPwConfirm(true);
            setU_pw(true);
            setPwCompare(true);
            return false;
        }
        setPwConfirm(false);
        setU_pw(false);
        setPwCompare(false);
        if (!regEmail.test(regForm.u_email)) {
            setU_email(true);
            return false;
        }
        setU_email(false);
        if (!regEmail.test(regForm.emailConfirm)) {
            setEmailConfirm(true);
            return false;
        }
        setEmailConfirm(false)
        if (regForm.emailConfirm !== regForm.u_email) {
            setEmailConfirm(true);
            setU_email(true);
            setEmailCompare(true);
            return false;
        }
        setEmailConfirm(false);
        setEmailCompare(false);
        setU_email(false);

        return true;
    };


    const submitForm = async () => {

        if (!formValidate()) {
            alert('제출 양식을 확인해주세요');
            return false;
        }

        const URL = '/common/userjoin'
        try {
            const res = await client.post(URL, regForm);
            if (res.data.result === 'success') {
                alert('회원가입이 완료되었습니다.');
                history.replace('/');
            }
        } catch (e) {
            console.log(e);
            alert('회원가입에 실패하였습니다.');
        }

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
                    error={u_id}
                    required
                    id="outlined-required"
                    label="아이디"
                    helperText="5글자 이상 입력해주세요"
                    name={'u_id'}
                />
                <TextField
                    error={u_cellPhone}
                    required
                    id="outlined-required"
                    label="휴대전화"
                    helperText="하이픈 없이 입력해 주세요"
                    name={'u_cellPhone'}
                />
                <TextField
                    error={u_pw}
                    required
                    id="outlined-required"
                    label="패스워드"
                    type={'password'}
                    name={'u_pw'}
                    helperText={pwCompare ? '비밀번호가 일치하지 않습니다' : "비밀번호를 5자 이상 입력해주세요"}
                />
                <TextField
                    error={pwConfirm}
                    required
                    id="outlined-required"
                    label="패스워드확인"
                    type={'password'}
                    name={'pwConfirm'}
                    helperText={pwCompare ? '비밀번호가 일치하지 않습니다' : "비밀번호를 한번 더 입력해주세요"}
                />
                <TextField
                    error={u_email}
                    required
                    id="outlined-required"
                    label="이메일"
                    name={'u_email'}
                    helperText={emailCompare ? '이메일주소가 일치하지 않습니다' : "이메일주소를 입력해주세요"}
                />
                <TextField
                    error={emailConfirm}
                    required
                    id="outlined-required"
                    label="이메일 확인"
                    name={'emailConfirm'}
                    helperText={emailCompare ? '이메일주소가 일치하지 않습니다' : "이메일주소를 한번 더 입력해주세요"}
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

