import React, {useLayoutEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import Unsubscribe from "../../components/Owner/Unsubscribe";


export default function UnsubscribeContainer() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const initPassword = {
        o_pw: ''
    }
    const [ownerForm, setOwnerForm] = useState(initPassword);


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setOwnerForm({...ownerForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // DB 비밀번호 유효성 검사 + 탈퇴결과
    const submitForm = async () => {
        const URL = '/owner/ownerExit'
        const data = {
            o_pw: ownerForm.o_pw,
        }

        try {
            const res = await client.post(URL, data);
            if (res.data === 1) {
                alert("가맹 해지 신청이 완료 되었습니다.")
            } else {
                alert("가맹 해지 신청에 실패하였습니다.")
            }

        } catch (e: any) {
            const err = e.response;
            if (err.data.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');

            } else if (err.data.status === 400) {
                alert(err.data.error);
            } else {
                alert('예상치 못한 에러로 인해 가맹 해지 신청에 실패하였습니다.\n잠시 후 다시 시도 바랍니다.')
            }
        }
    };

    return (
        <Unsubscribe handleForm={handleForm} submitForm={submitForm}/>
    )
}
