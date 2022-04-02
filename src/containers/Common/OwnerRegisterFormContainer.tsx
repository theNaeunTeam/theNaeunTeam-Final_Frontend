import React, {useEffect, useRef, useState} from "react";
import axios, {AxiosError} from "axios";
import {ownerRegisterFormType} from "../../lib/types";
import {client} from "../../lib/api/client";
import OwnerRegisterForm from "../../components/Common/OwnerRegisterForm";
import {useHistory} from "react-router-dom";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function OwnerRegisterFormContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const initValue = {
        o_sNumber: '',
        o_pw: '',
        pwConfirm: '',
        o_phone: '',
        o_name: '',
        o_cellPhone: '',
        o_address: '',
        o_time1: '09:00',
        o_time2: '21:00',
        o_image: null,
        o_latitude: '',
        o_longitude: '',
    };

    const history = useHistory();

    const o_nameRef = useRef(null);
    const o_addressRef = useRef(null);
    const fileDiv = useRef(null);
    const fileInputTag = useRef<HTMLInputElement>(null);

    const [regForm, setRegForm] = useState<ownerRegisterFormType>(initValue);
    const [address, setAddress] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소
    const [isOpenPost, setIsOpenPost] = useState(false);

    //객체로 만들어서 변경하면 재랜더링 안됨....
    const [o_sNumber, seto_sNumber] = useState(false);
    const [o_pw, seto_pw] = useState(false);
    const [pwConfirm, setpwConfirm] = useState(false);
    const [o_phone, seto_phone] = useState(false);
    const [o_name, seto_name] = useState(false);
    const [o_cellPhone, seto_cellPhone] = useState(false);
    const [o_address, seto_address] = useState(false);
    const [pwCompare, setPwCompare] = useState(false);


    const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
    };

    const onCompletePost = (data: any) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setAddress(data.zonecode);
        setAddressDetail(fullAddr);
        setIsOpenPost(false);
        // setRegForm({...regForm, o_address: fullAddr});

        const URL = 'https://dapi.kakao.com/v2/local/search/address.json?query=';
        const RESTAPIKEY = '61d180a1576d7421df51937a7d0b3b3a';

        axios.get(`${URL}${data.address}`, {
            headers: {Authorization: `KakaoAK ${RESTAPIKEY}`},
        })
            .then(res => {
                setRegForm({...regForm, o_latitude: res.data.documents[0].y, o_longitude: res.data.documents[0].x});
            })
            .catch(e => {
                alert('좌표 검색 실패하였습니다.');
            })
    };

    useEffect(() => {
        formVal();
    }, [regForm]);

    const formVal = (): boolean => {
        if (regForm.o_sNumber.length < 10 || regForm.o_sNumber.length > 10) {
            seto_sNumber(true);
            return false;
        }
        seto_sNumber(false);
        if (o_nameRef.current) (o_nameRef.current as HTMLInputElement).focus();

        if (!regForm.o_name) {
            seto_name(true);
            return false;
        }
        seto_name(false);

        if (addressDetail === '') {
            seto_address(true);
            return false;
        }
        seto_address(false);

        if (regForm.o_pw.length < 5) {
            seto_pw(true);
            return false;
        }
        seto_pw(false);

        if (!regForm.pwConfirm) {
            setpwConfirm(true);
            return false;
        }
        setpwConfirm(false);

        if (regForm.o_pw !== regForm.pwConfirm) {
            setpwConfirm(true);
            seto_pw(true);
            setPwCompare(true)
            return false;
        }
        setpwConfirm(false);
        seto_pw(false);
        setPwCompare(false);

        if (!regForm.o_phone) {
            seto_phone(true);
            return false;
        }
        seto_phone(false);

        if (!regForm.o_cellPhone) {
            seto_cellPhone(true);
            return false;
        }
        seto_cellPhone(false);

        return true;
    }

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {

        const tagName = (e.target as HTMLFormElement).name;

        if (tagName === 'o_sNumber' || tagName === 'o_phone' || tagName === 'o_cellPhone') { // 숫자만 입력할수있게
            setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value.replace(/[^0-9]/g, '')});
            return false;
        }
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    const submitForm = async () => {

        if (!formVal()) {
            fireSweetAlert({title: '제출 양식을 확인해주세요', icon: 'error'});
            return false;
        }

        if (!fileInputTag.current?.files || fileInputTag.current.files.length === 0) {
            if (fileDiv.current) (fileDiv.current as HTMLDivElement).style.border = '1px solid red';
            fireSweetAlert({title: '파일을 첨부해주세요', icon: 'error'});
            return false;
        }

        const URL = '/common/request';
        const formData = new FormData();

        formData.append('file', fileInputTag.current.files[0]);
        formData.append('o_sNumber', regForm.o_sNumber);
        formData.append('o_pw', regForm.o_pw);
        formData.append('o_phone', regForm.o_phone);
        formData.append('o_name', regForm.o_name);
        formData.append('o_cellPhone', regForm.o_cellPhone);
        formData.append('o_address', addressDetail);
        formData.append('o_time1', regForm.o_time1);
        formData.append('o_time2', regForm.o_time2);
        formData.append('o_latitude', regForm.o_latitude);
        formData.append('o_longitude', regForm.o_longitude);

        try {
            const res = await client.post(URL, formData);

            if (res.data === 1) {
                fireSweetAlert({title: '입점 신청이 완료되었습니다', icon: 'success'});
                history.replace('/');
            }
        } catch (e) {
            const err = (e as AxiosError).response;
            fireSweetAlert({title: err?.data.error, icon: 'error'});
        }
    }


    return (
        <>
            <OwnerRegisterForm
                handleFormChange={handleFormChange}
                o_sNumber={o_sNumber}
                regForm={regForm}
                o_name={o_name}
                o_nameRef={o_nameRef}
                isOpenPost={isOpenPost}
                onCompletePost={onCompletePost}
                onChangeOpenPost={onChangeOpenPost}
                o_address={o_address}
                addressDetail={addressDetail}
                o_addressRef={o_addressRef}
                o_pw={o_pw}
                pwCompare={pwCompare}
                pwConfirm={pwConfirm}
                o_phone={o_phone}
                o_cellPhone={o_cellPhone}
                fileDiv={fileDiv}
                fileInputTag={fileInputTag}
                submitForm={submitForm}
            />
        </>
    )
}
