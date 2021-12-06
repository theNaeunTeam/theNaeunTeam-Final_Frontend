import React from "react";
import UserNavbar from "./UserNavbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "@mui/material";
import styled from "styled-components";

const DivContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;
const DivNav = styled.div`
  width: 17%;
  font-size: 20px;
`;
const DivMain = styled.div`
  width: 80%;
  height: 100%;
  text-align: center;
  padding: 20px;
  min-height: 1000px;
  margin-right: 15%;
`;

export default function UserEdit(props: { handleFormChange: any; u_id: any; userForm: any; u_cellPhone: any; u_pw: any; pwCompare: any; pwConfirm: any; u_email: any; emailCompare: any; emailConfirm: any; setUserForm: any; submitForm: any; }) {
    const {
        handleFormChange,
        u_id,
        userForm,
        u_cellPhone,
        u_pw,
        pwCompare,
        pwConfirm,
        u_email,
        emailCompare,
        emailConfirm,
        setUserForm,
        submitForm,
    } = props;

    return (
        <DivContainer>
            <DivNav>
                <UserNavbar/>
            </DivNav>
            <DivMain>
                <h1 style={{marginBottom: '50px'}}>회원정보수정</h1>
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
                    <TextField
                        error={u_id}
                        required
                        id="outlined-required"
                        label="아이디"
                        name={'u_id'}
                        value={userForm.u_id}
                        disabled={true}
                    />
                    <TextField
                        error={u_cellPhone}
                        required
                        id="outlined-required"
                        label="휴대전화"
                        helperText="하이픈 없이 입력해 주세요"
                        name={'u_cellPhone'}
                        value={userForm.u_cellPhone}
                    />
                    <TextField
                        error={u_pw}
                        required
                        id="outlined-required"
                        label="변경할 패스워드"
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
                        value={userForm.u_email}
                    />
                    <TextField
                        error={emailConfirm}
                        required
                        id="outlined-required"
                        label="이메일 확인"
                        name={'emailConfirm'}
                        helperText={emailCompare ? '이메일주소가 일치하지 않습니다' : "이메일주소를 한번 더 입력해주세요"}
                        value={userForm.emailConfirm}
                    />

                    <div style={{width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                    <span style={{marginLeft: '20px', marginRight: '20px'}}>
                    <InputLabel id="demo-simple-select-label">나이</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userForm.u_age}
                        label="나이"
                        onChange={e => {
                            setUserForm({...userForm, u_age: e.target.value})
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
                    </div>
                    <Button style={{width: '50%'}} variant="outlined" onClick={submitForm}>
                        정보수정
                    </Button>
                </Stack>
            </DivMain>
        </DivContainer>
    )

}