import {ownerFormErrorType, ownerRegisterFormType} from "../modules/types";
import React from "react";

export const ownerFormValidate = (ownerRegisterForm: ownerRegisterFormType,
                                  formError: ownerFormErrorType,
                                  setFormError: React.Dispatch<React.SetStateAction<ownerFormErrorType>>,
                                  file: React.RefObject<HTMLInputElement>): boolean => {

    if (!ownerRegisterForm.o_sNumber) {
        setFormError({...formError, o_sNumber: true});
        alert('사업자등록번호를 입력해주세요.');
        return false;
    }
    if (ownerRegisterForm.o_sNumber.length !== 10) {
        setFormError({...formError, o_sNumber: true});
        alert('10글자가 아닙니다.');
        return false;
    }
    setFormError({...formError, o_sNumber: false});

    if (!ownerRegisterForm.o_name) {
        setFormError({...formError, o_name: true});
        alert('가게이름을 입력해주세요');
        return false;
    }
    setFormError({...formError, o_name: false});

    if (!ownerRegisterForm.o_address) {
        setFormError({...formError, o_address: true});
        alert('주소를 입력해주세요');
        return false;
    }
    setFormError({...formError, o_address: false});

    if (!ownerRegisterForm.o_pw) {
        setFormError({...formError, o_pw: true});
        alert('비밀번호를 입력해주세요');
        return false;
    }
    setFormError({...formError, o_pw: false});

    if (!ownerRegisterForm.pwConfirm) {
        setFormError({...formError, pwConfirm: true});
        alert('비밀번호확인을 입력해주세요');
        return false;
    }
    setFormError({...formError, pwConfirm: false});

    if (!ownerRegisterForm.o_pw !== !ownerRegisterForm.pwConfirm) {
        setFormError({...formError, o_pw: true, pwConfirm: true});
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    setFormError({...formError, o_pw: false, pwConfirm: false});

    if (!ownerRegisterForm.o_phone) {
        setFormError({...formError, o_phone: true});
        alert('전화번호를 입력해주세요');
        return false;
    }
    setFormError({...formError, o_phone: false});

    if (!ownerRegisterForm.o_cellPhone) {
        setFormError({...formError, o_cellPhone: true});
        alert('휴대폰번호를 입력해주세요');
        return false;
    }
    setFormError({...formError, o_cellPhone: false});

    if (!file) {
        alert('파일을 첨부해주세요');
        return false;
    }

    return true;
}