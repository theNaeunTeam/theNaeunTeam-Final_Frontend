import React from 'react';
import {Button, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import DaumPostcode from "react-daum-postcode";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function OwnerRegisterForm(props: { handleFormChange: any; o_sNumber: any; regForm: any; o_name: any; o_nameRef: any; isOpenPost: any; onChangeOpenPost: any; onCompletePost: any; o_address: any; addressDetail: any; o_addressRef: any; o_pw: any; pwCompare: any; pwConfirm: any; o_phone: any; o_cellPhone: any; fileDiv: any; fileInputTag: any; submitForm: any; }) {
    const {
        handleFormChange,
        o_sNumber,
        regForm,
        o_name,
        o_nameRef,
        isOpenPost,
        onChangeOpenPost,
        onCompletePost,
        o_address,
        addressDetail,
        o_addressRef,
        o_pw,
        pwCompare,
        pwConfirm,
        o_phone,
        o_cellPhone,
        fileDiv,
        fileInputTag,
        submitForm,
    } = props;
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
            <div
                style={{border: 'none', marginLeft: '200px', marginRight: '200px', marginTop: '10px', padding: '10px'}}>
                <Stack
                    onChange={(e: React.FormEvent<HTMLFormElement>) => handleFormChange(e)}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 3, width: '50ch'},
                    }}
                    noValidate
                    alignItems={"center"}
                    autoComplete="off"
                >
                    <div><h3>입점 신청</h3></div>
                    <TextField
                        error={o_sNumber}
                        required
                        id="outlined-required"
                        label="사업자번호"
                        name={'o_sNumber'}
                        helperText="10자리 숫자로 입력해 주세요"
                        value={regForm.o_sNumber}
                    />
                    <TextField
                        error={o_name}
                        required
                        id="outlined-required"
                        label="가게 이름"
                        name={'o_name'}
                        helperText="가게명을 입력해주세요"
                        ref={o_nameRef}
                    />
                    {isOpenPost ? (
                        <DaumPostcode style={postCodeStyle as React.CSSProperties} autoClose
                                      onComplete={onCompletePost}/>
                    ) : null}
                    <TextField
                        onClick={onChangeOpenPost}
                        error={o_address}
                        required
                        id="outlined-required"
                        label="가게 주소"
                        helperText="매장 주소를 입력해 주세요"
                        name={'o_address'}
                        disabled={true}
                        value={addressDetail}
                        ref={o_addressRef}
                    />
                    <TextField
                        error={o_pw}
                        required
                        id="outlined-required"
                        label="패스워드"
                        type={'password'}
                        name={'o_pw'}
                        helperText={pwCompare ? '비밀번호가 일치하지 않습니다' : '비밀번호를 5글자 이상 입력해주세요'}
                    />
                    <TextField
                        error={pwConfirm}
                        required
                        id="outlined-required"
                        label="패스워드확인"
                        type={'password'}
                        name={'pwConfirm'}
                        helperText={pwCompare ? '비밀번호가 일치하지 않습니다' : '비밀번호를 한번더 입력해주세요'}
                    />
                    <TextField
                        error={o_phone}
                        required
                        id="outlined-required"
                        label="가게 대표 번호"
                        helperText="가게 대표 번호를 하이픈 없이 입력해 주세요"
                        name={'o_phone'}
                        value={regForm.o_phone}
                    />
                    <TextField
                        error={o_cellPhone}
                        required
                        id="outlined-required"
                        label="사장님 전화번호"
                        helperText="전화번호를 하이픈 없이 입력해 주세요"
                        name={'o_cellPhone'}
                        value={regForm.o_cellPhone}
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
                        helperText="영업 시작 시간을 입력해 주세요"
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
                        helperText="영업 종료 시간을 입력해 주세요"
                    />
                    <div style={{
                        border: 'solid lightgrey 0.5px', borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginBottom: '20px', padding: '10px', width: '420px', height: '35px'
                    }}
                         ref={fileDiv}>
                        <span><AddAPhotoIcon/> 가게 대표 사진  </span>
                        <input type={'file'} ref={fileInputTag}/>
                    </div>
                    <div style={{width: '30%', margin: 'auto'}}>
                        <Button variant="outlined" onClick={submitForm} style={{width: '100%'}}>
                            입점등록
                        </Button>
                    </div>
                </Stack>
            </div>
        </>
    )
}
