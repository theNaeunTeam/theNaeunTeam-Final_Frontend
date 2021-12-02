import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {client} from "../../../lib/api/client";
import {useDispatch} from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './LoginForm.module.css';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import {CgUserlane} from "react-icons/cg";
import CancelIcon from '@mui/icons-material/Cancel';

export default function LoginForm(props: any) {

    const dispatch = useDispatch();
    const history = useHistory();

    const initValue = {
        radio: 'individual',
        u_id: '',
        u_pw: '',
    }

    const [loginForm, setloginForm] = useState(initValue);
    const [findPw, setFindPw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(loginForm);
        const tagName = (e.target as HTMLFormElement).name;
        setloginForm({...loginForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    const login = async () => {
        if (loginForm.radio === 'company') {
            const URL = '/common/ownerlogin';
            const data = {
                o_sNumber: loginForm.u_id,
                o_pw: loginForm.u_pw,
            }
            try {
                const res = await client.post(URL, data);
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem('ownerToken', res.headers["x-auth-token"]);
                    localStorage.setItem('o_sNumber', loginForm.u_id);
                    dispatch({type: 'ownerMode', payload: loginForm.u_id});
                    alert('가게 로그인 성공');
                    history.push('/owner');
                    props.setShowLoginForm(false);
                } else {
                    alert('사업자번호 및 비밀번호를 확인해 주세요');
                }
            } catch (e) {
                // @ts-ignore
                const err = e.response;
                alert(err.data.error);
                props.setShowLoginForm(false);
            }
        } else {
            const URL = '/common/userlogin';
            try {
                const res = await client.post(URL, loginForm);
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem('userToken', res.headers["x-auth-token"]);
                    localStorage.setItem('u_id', loginForm.u_id);
                    dispatch({type: 'userMode', payload: loginForm.u_id});
                    props.setShowLoginForm(false);
                    history.push('/');
                } else {
                    alert(`아이디 및 비밀번호를 확인해주세요`);
                }
            } catch (e) {
                // @ts-ignore
                const err = e.response;
                console.log(e);
                // console.log(err.data.error);
                alert(err.data.error);
                props.setShowLoginForm(false);
            }
        }

    }

    const findId = async () => {
        setLoading(true);
        const URL = '/common/userFindPW';
        console.log(findPw);
        const data = {
            u_id: findPw,
        }
        console.log(data);
        try {
            // 아이디 전송
            const res = await client.post(URL, data);
            setLoading(false);
            if (res) {
                alert("이메일로 비밀전호 재설정 메일을 보내드렸습니다.");
            }
        } catch (e) {
            //@ts-ignore
            const err = e.response
            alert(err.data.error);
        } finally {
            setOpen(false);
            props.setShowLoginForm(false);
        }
    }

    // 비번 찾기 모달창 열기닫기
    const [open, setOpen] = useState(false);

    // 비밀번호 찾기 버튼 눌렀을때
    const handleClickOpen = () => {

        setOpen(true);
    };

    // 취소 버튼 눌렀을때
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={styles.fadeInDown + " " + styles.wrapper}>
                <div id={styles.formContent}>
                    <form onChange={e => handleForm(e)} onSubmit={e => e.preventDefault()}
                          style={{display: 'inline-block'}}>
                        <div className={styles.fadeIn + " " + styles.first}>
                            {props.setShowLoginForm &&
                                <span className={styles.loginFormHeader}>
                                <CancelIcon style={{cursor: 'pointer'}} onClick={() => props.setShowLoginForm(false)}/>
                                </span>
                            }
                            <h1>탄다마켓 로그인</h1>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">회원 유형을 선택해 주세요</FormLabel>
                                <RadioGroup row aria-label="type" name="radio" defaultValue={'individual'}>
                                    <FormControlLabel
                                        value="individual"
                                        control={<Radio/>} label="개인회원"/>
                                    <FormControlLabel
                                        value="company" control={<Radio/>} label="업체회원"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <br/>

                        <div className={styles.fadeIn + " " + styles.first} style={{fontSize: '20px'}}>
                            {loginForm.radio === 'individual' ? <CgUserlane style={{width: '50px', height: '50px'}}/>
                                : <AddBusinessTwoToneIcon style={{width: '50px', height: '50px'}}/>}
                        </div>

                        <br/>
                        <div className={styles.fadeIn + " " + styles.second}>
                            <Box
                                sx={{
                                    '& > :not(style)': {m: 1, width: '25ch'},
                                }}
                            >
                                <TextField id="outlined-basic"
                                           label={loginForm.radio === 'individual' ? '아이디' : '사업자번호'}
                                           variant="filled" name={'u_id'}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <AccountCircle/>
                                                   </InputAdornment>
                                               ),
                                           }}
                                />

                                <TextField id="outlined-basic" type='password' label="비밀번호" variant="filled"
                                           name={'u_pw'}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <VpnKeyIcon/>
                                                   </InputAdornment>
                                               ),
                                           }}/>
                            </Box>
                        </div>
                        <br/>
                        <button className={styles.fadeIn + " " + styles.fourth + " " + styles.loginBtn}
                                onClick={login}>로그인
                        </button>
                    </form>
                    <br/><br/>
                    {
                        loginForm.radio === 'individual'
                            ?
                            <div id={styles.formFooter}>
                                <Button variant="outlined"
                                        onClick={() => {
                                            props.setShowLoginForm(false);
                                            history.push('/user/register');
                                        }}>
                                    회원가입
                                </Button> {' '}
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    비밀번호 찾기
                                </Button>
                            </div>
                            :
                            <div id={styles.formFooter}>
                                <Button variant="outlined" onClick={() => history.push('/owner/register')}>
                                    입점신청
                                </Button>
                            </div>
                    }

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>비밀번호 찾기</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                ID를 입력하시면 연결된 이메일 주소로 비밀번호 찾기 메일이 발송됩니다
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="id"
                                label="아이디"
                                // type="email"
                                fullWidth
                                variant="standard"
                                value={findPw}
                                onChange={e => setFindPw(e.target.value)}
                            />
                            <Backdrop
                                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                                open={loading}
                            >
                                <CircularProgress color="inherit"/>
                            </Backdrop>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>취소</Button>
                            <Button onClick={findId}>확인</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}