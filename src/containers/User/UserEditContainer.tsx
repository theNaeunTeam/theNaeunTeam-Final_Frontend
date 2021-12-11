import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import UserEdit from "../../components/User/UserEdit";
import {useSweetAlert} from "../../lib/useSweetAlert";


export default function UserEditContainer() {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const initValue = {
        u_id: '',
        u_pw: '',
        pwConfirm: '',
        u_cellPhone: '',
        u_email: '',
        u_gender: '',
        u_age: '',
        emailConfirm: '',
    };
    const {fireSweetAlert} = useSweetAlert();

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
        if (userForm.u_pw === null) {
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
            fireSweetAlert({title: '제출 양식을 확인해 주세요', icon: 'error'});
            return false;
        }

        const URL = '/user/userUpdate'
        try {
            const res = await client.post(URL, userForm);
            if (res.data === 1) {
                fireSweetAlert({title: '회원 정보 수정이 완료되었습니다.', icon: 'success'});
                history.replace('/user')
            } else {
                alert('회원 정보 수정이 실패했습니다.');
                history.goBack();
            }
        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
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
            setUserForm({...userForm, ...res.data});
            // setUserEmail(res.data);
        } catch (e: any) {
            if (e.response) {
                if (e.response.status === 500) {
                    fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});

                } else if (e.response.status === 400) {
                    fireSweetAlert({title: e.response.data.error,icon: 'error'});
                } else {
                    fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
                }
            }
        }
    };
    return (
        <UserEdit handleFormChange={handleFormChange} u_id={u_id} userForm={userForm} u_cellPhone={u_cellPhone}
                  u_pw={u_pw} pwCompare={pwCompare} pwConfirm={pwConfirm} u_email={u_email} emailCompare={emailCompare}
                  emailConfirm={emailConfirm} setUserForm={setUserForm} submitForm={submitForm}/>
    )
}
