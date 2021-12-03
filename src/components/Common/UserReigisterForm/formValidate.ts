import React from "react";
import {userFormType} from "../../../modules/types";

const formErrorinit = {
    u_id: false,
    u_cellPhone: false,
    u_pw: false,
    pwConfirm: false,
    u_email: false,
    emailConfirm: false,
    u_gender: false,
    u_age: false,
}

const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

export const formValidate = (form: { [key: string]: string },
                             error: { [key: string]: boolean },
                             setError: React.Dispatch<React.SetStateAction<userFormType>>): boolean => {

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

    if (form.u_id.length < 5) {
        setError({...error, u_id: true});
        return false;
    }
    setError({...error, u_id: false});

    if (!regPhone.test(form.u_cellPhone)) {
        setError({...error, u_cellPhone: true});
        return false;
    }
    setError({...error, o_name: false});

    if (!form.o_address) {
        setError({...error, o_address: true});
        alert('주소를 입력해주세요');
        return false;
    }
    setError({...error, o_address: false});

    if (!form.o_pw) {
        setError({...error, o_pw: true});
        alert('비밀번호를 입력해주세요');
        return false;
    }
    setError({...error, o_pw: false});

    if (!form.pwConfirm) {
        setError({...error, pwConfirm: true});
        alert('비밀번호확인을 입력해주세요');
        return false;
    }
    setError({...error, pwConfirm: false});

    if (!form.o_pw !== !form.pwConfirm) {
        setError({...error, o_pw: true, pwConfirm: true});
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    setError({...error, o_pw: false, pwConfirm: false});

    if (!form.o_phone) {
        setError({...error, o_phone: true});
        alert('전화번호를 입력해주세요');
        return false;
    }
    setError({...error, o_phone: false});

    if (!form.o_cellPhone) {
        setError({...error, o_cellPhone: true});
        alert('휴대폰번호를 입력해주세요');
        return false;
    }
    setError({...error, o_cellPhone: false});


    return true;
}