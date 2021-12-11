import React, {useEffect, useState} from "react";
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import UserRegisterForm from "../../components/Common/UserRegisterForm";
import {useSweetAlert} from "../../lib/useSweetAlert";

const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

export default function UserRegisterFormContainer() {
    const {fireSweetAlert} = useSweetAlert();

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

    const history = useHistory();

    const [regForm, setRegForm] = useState<{ [key: string]: string }>(initValue);

    const [u_id, setU_id] = useState(false);
    const [u_pw, setU_pw] = useState(false);
    const [u_cellPhone, setU_cellPhone] = useState(false);
    const [pwConfirm, setPwConfirm] = useState(false);
    const [u_email, setU_email] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [pwCompare, setPwCompare] = useState(false);
    const [emailCompare, setEmailCompare] = useState(false);

    useEffect(() => {
        formValidate();
    }, [regForm]);

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        if (tagName === 'u_cellPhone') {
            setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value.replace(/[^0-9]/g, '')});
            return false;
        }
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    const formValidate = (): boolean => {
        if (regForm.u_id.length < 5) {
            setU_id(true);
            return false;
        }
        setU_id(false);
        if (regForm.u_cellPhone.length < 11) {
            setU_cellPhone(true);
            return false;
        }
        setU_cellPhone(false);
        if (regForm.u_pw.length < 5) {
            setU_pw(true);
            return false;
        }
        setU_pw(false);
        if (regForm.pwConfirm.length < 5) {
            setPwConfirm(true);
            return false;
        }
        setPwConfirm(false);
        if (regForm.u_pw !== regForm.pwConfirm) {
            setPwConfirm(true);
            setU_pw(true);
            setPwCompare(true);
            return false;
        }
        setPwConfirm(false);
        setU_pw(false);
        setPwCompare(false);
        if (!regEmail.test(regForm.u_email)) {
            setU_email(true);
            return false;
        }
        setU_email(false);
        if (!regEmail.test(regForm.emailConfirm)) {
            setEmailConfirm(true);
            return false;
        }
        setEmailConfirm(false)
        if (regForm.emailConfirm !== regForm.u_email) {
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


    const submitForm = async () => {

        if (!formValidate()) {
            fireSweetAlert({title: '제출 양식을 확인해주세요', icon: 'error'});
            return false;
        }

        const URL = '/common/userjoin'
        try {
            const res = await client.post(URL, regForm);
            // if (res.data.result === 'success') {
            fireSweetAlert({title: '회원가입이 완료되었습니다', icon: 'success'});
            history.replace('/');
            // }
        } catch (e: any) {
            if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error, icon: 'error'});
            } else {
                alert('에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.');
            }
        }

    };


    return (<>
            <UserRegisterForm handleFormChange={handleFormChange} u_id={u_id} u_cellPhone={u_cellPhone} u_pw={u_pw}
                              pwCompare={pwCompare} pwConfirm={pwConfirm} u_email={u_email} emailCompare={emailCompare}
                              emailConfirm={emailConfirm} regForm={regForm} setRegForm={setRegForm}
                              submitForm={submitForm}/>
        </>
    )
}

