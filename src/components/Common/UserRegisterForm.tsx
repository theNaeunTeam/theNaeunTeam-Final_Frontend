import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Button} from "@mui/material";

export default function UserRegisterForm(props: { handleFormChange: any; u_id: any; u_cellPhone: any; u_pw: any; pwCompare: any; pwConfirm: any; u_email: any; emailCompare: any; emailConfirm: any; regForm: any; setRegForm: any; submitForm: any; }) {
    const {
        handleFormChange,
        u_id,
        u_cellPhone,
        u_pw,
        pwCompare,
        pwConfirm,
        u_email,
        emailCompare,
        emailConfirm,
        regForm,
        setRegForm,
        submitForm,
    } = props;

    return (
        <div
            style={{border: 'none', marginLeft: '200px', marginRight: '200px', marginTop: '10px', padding: '10px'}}>
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