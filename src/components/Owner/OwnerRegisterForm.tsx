import React, {useState} from "react";
import TextField from '@mui/material/TextField'
import {Button, Stack} from "@mui/material";
import {client} from "../../lib/api/client";


export default function OwnerRegisterForm() {

    interface formInterface {
        o_sNumber: string,
        o_pw: string,
        pwConfirm: string,
        o_phone: string,
        o_name: string,
        o_cellPhone: string,
        o_address: string,
        o_time1: string,
        o_time2: string,
        o_image?: null | FileList | Blob,
    }

    const initValue = {
        o_sNumber: '',
        o_pw: '',
        pwConfirm: '',
        o_phone: '',
        o_name: '',
        o_cellPhone: '',
        o_address: '',
        o_time1: '',
        o_time2: '',
        o_image: null,
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
    };

    const [regForm, setRegForm] = useState<formInterface>(initValue);
    const [formError, setFormError] = useState(errorInit);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(regForm);
        const tagName = (e.target as HTMLFormElement).name;
        setRegForm({...regForm, [tagName]: (e.target as HTMLFormElement).value});
    }
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        setRegForm({...regForm, o_image: e.target.files});
    }

    const submitForm = async () => {

        const URL = '/owner/request';
        const formData = new FormData();

        formData.append('file', regForm.o_image as Blob);
        // formData.append('o_sNumber', regForm.o_sNumber);
        // formData.append('o_pw', regForm.o_pw);
        // formData.append('o_phone', regForm.o_phone);
        // formData.append('o_name', regForm.o_name);
        // formData.append('o_cellPhone', regForm.o_cellPhone);
        // formData.append('o_address', regForm.o_address);
        // formData.append('o_time1', regForm.o_time1);
        // formData.append('o_time2', regForm.o_time2);

        console.log(formData.keys());

        try {
            const res = await client.post(URL, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    }
                }
            );

            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

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
                    error={formError.o_address}
                    required
                    id="outlined-required"
                    label="가게 주소"
                    helperText="매장 주소(상세주소 포함)를 입력해 주세요"
                    name={'o_address'}
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
                    defaultValue="07:30"
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
                    defaultValue="19:30"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 600, // 10 min
                    }}
                    sx={{width: 150}}
                />
                <div style={{width: '30%', margin: 'auto'}}>
                    <form>
                        <label>사진업로드</label>
                        <input name={'file'} type={'file'} onChange={e => handleFileInput(e)}/>
                    </form>
                    <Button variant="outlined" onClick={submitForm} style={{width: '100%'}}>
                        입점등록
                    </Button>
                </div>
            </Stack>
        </>
    )
}
