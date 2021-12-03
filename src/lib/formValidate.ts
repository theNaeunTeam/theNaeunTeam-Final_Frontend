import {ownerFormErrorType, ownerRegisterFormType} from "../modules/types";
import React from "react";

export const formValidate = (form: ownerRegisterFormType,
                             error: ownerFormErrorType,
                             setError: React.Dispatch<React.SetStateAction<ownerFormErrorType>>): boolean => {

    if (!form.o_sNumber) {
        setError({...error, o_sNumber: true});
        alert('사업자등록번호를 입력해주세요.');
        return false;
    }
    if (form.o_sNumber.length !== 10) {
        setError({...error, o_sNumber: true});
        alert('10글자가 아닙니다.');
        return false;
    }
    setError({...error, o_sNumber: false});

    if (!form.o_name) {
        setError({...error, o_name: true});
        alert('가게이름을 입력해주세요');
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