import React, {useRef, useState} from "react";
import TextField from '@mui/material/TextField'
import {Button, Stack} from "@mui/material";
import {client} from "../../lib/api/client";
import DaumPostcode from 'react-daum-postcode';
import axios from "axios";
import {ownerRegisterFormType} from "../../modules/types";


export default function OwnerRegisterForm() {

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
    const errorInit = {
        o_sNumber: false,
        o_pw: false,
        pwConfirm: false,
        o_phone: false,
        o_name: false,
        o_cellPhone: false,
        o_address: false,
        o_time1: false,
        o_time2: false,
        o_image: false,
    };

    const [regForm, setRegForm] = useState<ownerRegisterFormType>(initValue);
    const [formError, setFormError] = useState(errorInit);
    const fileInputTag = useRef<HTMLInputElement>(null);
    const [address, setAddress] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소
    const [isOpenPost, setIsOpenPost] = useState(false);

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

        const URL = 'http://dapi.kakao.com/v2/local/search/address.json?query=';
        const RESTAPIKEY = '61d180a1576d7421df51937a7d0b3b3a';

        axios.get(`${URL}${data.address}`, {
            headers: {Authorization: `KakaoAK ${RESTAPIKEY}`},
        })
            .then(res => {
                setRegForm({...regForm, o_latitude: res.data.documents[0].y, o_longitude: res.data.documents[0].x});
            })
            .catch(e => {
                alert('좌표 검색 실패');
                console.log(e);
            })
    };


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(regForm);
        const tagName = (e.target as HTMLFormElement).name;
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    const submitForm = async () => {

        const URL = '/owner/request';
        const formData = new FormData();

        // @ts-ignore
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
            alert('등록성공');
            console.log(res);
        } catch (e) {
            alert('실패');
            console.log(e);
        }
    }

    const postCodeStyle = {
        display: 'block',
        position: 'relative',
        top: '0%',
        width: '400px',
        height: '400px',
        padding: '7px',
    };

    return (
        <>
            <Stack
                onChange={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 3, width: '50ch'},
                }}
                noValidate
                alignItems={"center"}
                autoComplete="off"
            >
                <TextField
                    error={formError.o_sNumber}
                    required
                    id="outlined-required"
                    label="사업자번호"
                    name={'o_sNumber'}
                />
                <TextField
                    error={formError.o_name}
                    required
                    id="outlined-required"
                    label="가게 이름"
                    name={'o_name'}
                />
                {isOpenPost ? (
                    //@ts-ignore
                    <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost}/>
                ) : null}
                <TextField
                    onClick={onChangeOpenPost}
                    error={formError.o_address}
                    required
                    id="outlined-required"
                    label="가게 주소"
                    helperText="매장 주소를 입력해 주세요"
                    name={'o_address'}
                    disabled={true}
                    value={addressDetail}
                />
                <TextField
                    error={formError.o_pw}
                    required
                    id="outlined-required"
                    label="패스워드"
                    type={'password'}
                    name={'o_pw'}
                />
                <TextField
                    error={formError.pwConfirm}
                    required
                    id="outlined-required"
                    label="패스워드확인"
                    type={'password'}
                    name={'pwConfirm'}
                />
                <TextField
                    error={formError.o_phone}
                    required
                    id="outlined-required"
                    label="가게 대표 번호"
                    helperText="하이픈 없이 입력해 주세요"
                    name={'o_phone'}
                />
                <TextField
                    error={formError.o_cellPhone}
                    required
                    id="outlined-required"
                    label="사장님 전화번호"
                    helperText="하이픈 없이 입력해 주세요"
                    name={'o_cellPhone'}
                />
                <TextField
                    name={'o_time1'}
                    id="time"
                    label="영업 시작 시간"
                    type="time"
                    defaultValue="09:00"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 600, // 10 min
                    }}
                    sx={{width: 150}}
                />
                <TextField
                    name={'o_time2'}
                    id="time"
                    label="영업 종료 시간"
                    type="time"
                    defaultValue="21:00"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 600, // 10 min
                    }}
                    sx={{width: 150}}
                />
                <input type={'file'} ref={fileInputTag}/>
                <div style={{width: '30%', margin: 'auto'}}>
                    <Button variant="outlined" onClick={submitForm} style={{width: '100%'}}>
                        입점등록
                    </Button>
                </div>
            </Stack>
        </>
    )
}
