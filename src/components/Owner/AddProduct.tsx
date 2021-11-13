import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import {client} from "../../lib/api/client";
import {Stack} from "@mui/material";
import {Button} from "@material-ui/core";

export default function AddProduct() {

    const initValue = {
        g_code:'',
        g_name:'',
        g_count:'',
        g_price:'',
        g_discount:'',
        g_detail:'',
        g_image:'',
        g_expireDate:'',
        g_status:'',
        g_category:''
    };

    const formErrorinit = {
        g_code:false,
        g_name:false,
        g_count:false,
        g_price:false,
        g_discount:false,
        g_detail:false,
        g_image:false,
        g_expireDate:false,
        g_status:false,
        g_category:false
    }

    const submitForm = async () => {
        const URL = '/auth/userjoin'
        try {
            const res = await client.post(URL, productForm);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const [productForm, setProduct] = useState(initValue);
    const [formError, setFormError] = useState(formErrorinit);

    // 아이디값을 가져와서 state 값을 업데이트 해준다
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setProduct({...productForm, [tagName]: (e.target as HTMLFormElement).value});
        // formValidate();
    }


    return (
        <>
            <h1>상품등록</h1>
            <Stack
                onChange={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 3, width: '50ch'},
                }}
                noValidate
                autoComplete="off"
                alignItems="center"
            >
                    <TextField
                        error={formError.g_code}
                        required
                        id="outlined-required"
                        label="상품 고유 번호"
                        helperText="상품 고유 번호를 입력해주세요"
                        name={'g_code'}
                    />
                    <TextField
                        error={formError.g_name}
                        required
                        id="outlined-required"
                        label="상품 이름"
                        name={'g_name'}
                    />
                    <TextField
                        error={formError.g_count}
                        type='number'
                        required
                        id="outlined-required"
                        label="상품 수량"
                        name={'g_count'}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        error={formError.g_price}
                        required
                        id="outlined-required"
                        label="상품정가"
                        name={'g_price'}
                    />
                    <TextField
                        error={formError.g_discount}
                        required
                        id="outlined-required"
                        label="할인가"
                        name={'g_discount'}
                    />
                    <TextField
                        error={formError.g_detail}
                        required
                        id="outlined-required"
                        label="상세설명"
                        name={'g_detail'}
                    />
                    <TextField
                        error={formError.g_image}
                        required
                        id="outlined-required"
                        label="상품사진URL"
                        name={'g_image'}
                    />
                    <TextField
                        error={formError.g_expireDate}
                        required
                        id="outlined-required"
                        label="유통기한"
                        name={'g_expireDate'}
                    />
                    <TextField
                        error={formError.g_status}
                        required
                        id="outlined-required"
                        label="상품 상태"
                        name={'g_status'}
                    />
                    <TextField
                        error={formError.g_category}
                        required
                        id="outlined-required"
                        label="상품 카테고리"
                        name={'g_category'}
                    />
                        <Button variant="contained" size="large" onClick={submitForm}>
                            상품등록
                        </Button>
             </Stack>
        </>
    )
}
