/* eslint-disable */
import React, {useLayoutEffect, useState} from 'react';
import {client} from "../../../lib/api/client";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import UserExit from "./UserExit";

export default function UserExitContainer() {

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);

    const initPassword = {
        u_pw: ''
    }

    const [userForm, setUserForm] = useState(initPassword);
    const dispatch = useDispatch();

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // DB 비밀번호 유효성 검사 + 탈퇴결과
    const submitForm = async () => {
        const URL = '/user/userDelete'
        console.log('입력한 회원탈퇴 비밀번호 ');
        console.log(userForm.u_pw);
        const data = {
            u_pw: userForm.u_pw,
        }
        try {
            const res = await client.post(URL, userForm);
            console.log(res.data);
            res.data === 1
                ? (alert('회원 탈퇴 되었습니다.'), dispatch({type: 'logoutAll'}), history.push('/'))
                : alert('회원 탈퇴 실패하였습니다.')
        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')
            } else if (e.response.status === 400) {
                alert(e.response.data.error);
            } else {
                alert('예상치 못한 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.')
            }

        }
    };


    return (
        <UserExit handleForm={handleForm} submitForm={submitForm}/>
    )
}
