import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {client} from "../../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import LoginForm from "./LoginForm";

export default function LoginFormContainer() {

    const dispatch = useDispatch();
    const history = useHistory();

    const initValue = {
        radio: 'individual',
        u_id: '',
        u_pw: '',
    }

    const {showLoginModal} = useSelector((state: RootState) => state)

    const [loginForm, setloginForm] = useState(initValue);
    const [findPw, setFindPw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
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
                if (res.status === 200) {
                    localStorage.setItem('ownerToken', res.headers["x-auth-token"]);
                    localStorage.setItem('o_sNumber', loginForm.u_id);
                    dispatch({type: 'ownerMode', payload: loginForm.u_id});
                    history.push('/owner');
                    dispatch({type: false});
                } else {
                    alert('사업자번호 및 비밀번호를 확인해 주세요');
                }

            } catch (e) {
                // @ts-ignore
                const err = e.response;
                alert(err.data.error);
            }
        } else {
            const URL = '/common/userlogin';
            try {
                const res = await client.post(URL, loginForm);
                if (res.status === 200) {
                    localStorage.setItem('userToken', res.headers["x-auth-token"]);
                    localStorage.setItem('u_id', loginForm.u_id);
                    dispatch({type: 'userMode', payload: loginForm.u_id});

                    dispatch({type: false});
                    history.push('/');
                }
            } catch (e: any) {
                console.log(e.response.data.error);
                alert(e.response.data.error);
            }
        }

    }

    const findId = async () => {
        setLoading(true);
        const URL = '/common/userFindPW';
        const data = {
            u_id: findPw,
        }
        try {
            // 아이디 전송
            const res = await client.post(URL, data);
            setLoading(false);
            if (res) {
                alert("이메일로 비밀번호 재설정 메일을 보내드렸습니다.");
            }
        } catch (e: any) {
            alert('아이디를 찾을 수 없습니다');
            // const err = e.response
            // alert(err.data.error);
        } finally {
            setOpen(false);
            dispatch({type: false});
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
            <LoginForm handleForm={handleForm} showLoginModal={showLoginModal}
                       dispatch={dispatch} loginForm={loginForm} login={login}
                       history={history} handleClickOpen={handleClickOpen}
                       handleClose={handleClose} findPw={findPw} setFindPw={setFindPw}
                       loading={loading} findId={findId} open={open}
            />
        </>
    )
}
