import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function RegisterFormM() {

    const initValue = {
        u_id: '',
        p_pw: '',
        pwConfirm: '',
        u_cellPhone: '',
        u_email: '',
        u_gender: '남성',
        u_age: '',
    };

    const [regForm, setRegForm] = useState(initValue);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(regForm);
        const tagName = (e.target as HTMLFormElement).name;
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});

    }

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

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
                        required
                        id="outlined-required"
                        label="아이디"
                        name={'u_id'}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="패스워드"
                        type={'password'}
                        name={'p_pw'}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="패스워드확인"
                        type={'password'}
                        name={'pwConfirm'}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="휴대전화"
                        helperText="하이픈 없이 입력해 주세요"
                        name={'u_cellPhone'}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="이메일"
                        name={'u_email'}
                    />
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup row aria-label="gender" name={'u_gender'}>
                        <FormControlLabel value="남성" control={<Radio/>} label="남성"/>
                        <FormControlLabel value="여성" control={<Radio/>} label="여성"/>
                    </RadioGroup>
                    나이
                    <select name={'u_age'}>
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
                </div>

            </Box>
        </>
    )
}
