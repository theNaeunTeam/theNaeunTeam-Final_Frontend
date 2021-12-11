/* eslint-disable */
import React, {useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import UserExit from "../../components/User/UserExit";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function UserExitContainer() {
    const {fireSweetAlert} = useSweetAlert();

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
        try {
            const res = await client.post(URL, userForm);
            res.data === 1
                ? (alert('회원 탈퇴 되었습니다.'), dispatch({type: 'logoutAll'}), history.replace('/'))
                : alert('회원 탈퇴 실패하였습니다.')
        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
            } else {
                alert('예상치 못한 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.')
            }

        }
    };


    return (
        <UserExit handleForm={handleForm} submitForm={submitForm}/>
    )
}
