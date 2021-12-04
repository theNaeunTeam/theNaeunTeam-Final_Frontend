import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import Stack from "@mui/material/Stack";
import UserNavbar from "./UserNavbar";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const DivContainer = styled.div`
  //border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;
const DivNav = styled.div`
  //border: solid blue;
  width: 17%;
  font-size: 20px;
`;
const DivMain = styled.div`
  //border: solid red;
  width: 80%;
  height: 100%;
  text-align: center;
  padding: 20px;
  min-height: 1000px;
  margin-right: 15%;
  //align-content: center;
  
`;


export default function UserEdit() {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const initValue = {
        u_id: '',
        u_pw: '',
        pwConfirm: '',
        u_cellPhone: '',
        u_email: '',
        u_gender: '',
        u_age: '',
        emailConfirm:'',
    };

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);


    const [userForm, setUserForm] = useState(initValue);

    const [u_id, setU_id] = useState(false);
    const [u_pw, setU_pw] = useState(false);
    const [u_cellPhone, setU_cellPhone] = useState(false);
    const [pwConfirm, setPwConfirm] = useState(false);
    const [u_email, setU_email] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [pwCompare, setPwCompare] = useState(false);
    const [emailCompare, setEmailCompare] = useState(false);

    const formValidate = (): boolean => {
        if (userForm.u_id.length < 5) {
            setU_id(true);
            return false;
        }
        setU_id(false);
        if (userForm.u_cellPhone.length < 11) {
            setU_cellPhone(true);
            return false;
        }
        setU_cellPhone(false);
        if(userForm.u_pw===null){
            setU_pw(true);
            return false;
        }
        if (userForm.u_pw.length < 5) {
            setU_pw(true);
            return false;
        }
        setU_pw(false);
        if (userForm.pwConfirm.length < 5) {
            setPwConfirm(true);
            return false;
        }
        setPwConfirm(false);
        if (userForm.u_pw !== userForm.pwConfirm) {
            setPwConfirm(true);
            setU_pw(true);
            setPwCompare(true);
            return false;
        }
        setPwConfirm(false);
        setU_pw(false);
        setPwCompare(false);
        if (!regEmail.test(userForm.u_email)) {
            setU_email(true);
            return false;
        }
        setU_email(false);
        if (!regEmail.test(userForm.emailConfirm)) {
            setEmailConfirm(true);
            return false;
        }
        setEmailConfirm(false)
        if (userForm.emailConfirm !== userForm.u_email) {
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

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        if (tagName === 'u_cellPhone') {
            setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value.replace(/[^0-9]/g, '')});
            return false;
        }
        setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // 유저 정보 업데이트
    const submitForm = async () => {
        if (!formValidate()) {
            alert('제출 양식을 확인해주세요');
            return false;
        }

        const URL = '/user/userUpdate'
        console.log(userForm);
        try {
            const res = await client.post(URL, userForm);
            console.log(res.data);
            if(res.data === 1){
                alert('회원 정보 수정이 완료되었습니다.');
                history.replace('/user')
            }else{
                alert('회원 정보 수정이 실패했습니다.');
                history.goBack();
            }
        } catch (e: any) {
            console.log(e.response)
            if (e.response.status === 500) {
                alert("서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.");
            } else if (e.response.status === 400) {
                alert(e.response.data.error);
            } else {
                alert('예상치 못한 에러로 인해 회원 정보 수정이 실패하였습니다.\n잠시 후 다시 시도 바랍니다.');
            }
        }
    };
    useEffect(() => {
        formValidate();
    }, [userForm]);
    useEffect(() => {
        userData();
    }, [])

    // 유저 데이터 가져오기
    const userData = async () => {
        const URL = '/user/userData';

        try {
            const res = await client.get(URL);
            console.log(res);
            setUserForm({...userForm,...res.data});
            // setUserEmail(res.data);
        } catch (e: any) {
            console.log(e.response);
            if (e.response) {
                if (e.response.status === 500) {
                    alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');

                } else if (e.response.status === 400) {
                    alert(e.response.data.error);
                } else {
                    alert('데이터를 가져오는 중 문제가 발생했습니다.\n잠시 후 다시 시도 바랍니다.')
                }
            }
        }
    };


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
                {/*<Stack*/}
                {/*    onChange={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}*/}
                {/*    component="form"*/}
                {/*    sx={{*/}
                {/*        '& .MuiTextField-root': {m: 3, width: '50ch'},*/}
                {/*    }}*/}
                {/*    noValidate*/}
                {/*    autoComplete="off"*/}
                {/*    alignItems={"center"}*/}
                {/*    className='editForm'*/}
                {/*>*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        id="outlined-required"*/}
                {/*        label="아이디"*/}
                {/*        name={'u_id'}*/}
                {/*        value={userForm.u_id}*/}
                {/*        // disabled={true}*/}
                {/*        InputProps={{*/}
                {/*            readOnly: true,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        error={formError.u_pw}*/}
                {/*        required*/}
                {/*        id="outlined-required"*/}
                {/*        label="변경할 패스워드"*/}
                {/*        type={'password'}*/}
                {/*        name={'u_pw'}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        error={formError.pwConfirm}*/}
                {/*        required*/}
                {/*        id="outlined-required"*/}
                {/*        label="패스워드 확인"*/}
                {/*        type={'password'}*/}
                {/*        name={'pwConfirm'}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        error={formError.u_cellPhone}*/}
                {/*        required*/}
                {/*        id="outlined-required"*/}
                {/*        label="휴대전화"*/}
                {/*        helperText="하이픈 없이 입력해 주세요"*/}
                {/*        name={'u_cellPhone'}*/}
                {/*        value={userForm.u_cellPhone}*/}
                {/*        InputProps={{*/}
                {/*            readOnly: false,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        id="outlined-required"*/}
                {/*        label="이메일"*/}
                {/*        value={userEmail.u_email}*/}
                {/*        InputProps={{*/}
                {/*            readOnly: true,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        error={formError.u_email}*/}
                {/*        required*/}
                {/*        id="outlined-required"*/}
                {/*        label="변경할 이메일"*/}
                {/*        name={'u_email'}*/}
                {/*    />*/}
                {/*    <div style={{width: '30%', margin: 'auto'}}>*/}
                {/*        <FormLabel component="legend">성별</FormLabel>*/}
                {/*        <RadioGroup row aria-label="gender" name={'u_gender'} value={userForm.u_gender}*/}
                {/*                    style={{width: '200px', margin: '10px auto'}}>*/}
                {/*            <FormControlLabel id={'u_gender'} value="남성" control={<Radio/>} defaultChecked={true}*/}
                {/*                              label="남성"/>*/}
                {/*            <FormControlLabel id={'u_gender'} value="여성" control={<Radio/>} label="여성"/>*/}
                {/*        </RadioGroup>*/}
                {/*        나이*/}
                {/*        <select name={'u_age'} style={{width: '50%', margin: '12px'}} value={userForm.u_age}>*/}
                {/*            <option>AGE</option>*/}
                {/*            <option value="10">10대</option>*/}
                {/*            <option value="20">20대</option>*/}
                {/*            <option value="30">30대</option>*/}
                {/*            <option value="40">40대</option>*/}
                {/*            <option value="50">50대</option>*/}
                {/*            <option value="60">60대</option>*/}
                {/*            <option value="70">70대</option>*/}
                {/*            <option value="80">80대</option>*/}
                {/*            <option value="90">90대</option>*/}
                {/*        </select>*/}

                {/*        <Button style={{width: '60%', margin: '20px', border: 'solid'}} variant="outlined"*/}
                {/*                onClick={submitForm}>*/}
                {/*            정보 수정*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Stack>*/}
            </DivMain>
        </DivContainer>
    )
}
