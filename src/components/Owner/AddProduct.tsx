import React, {useEffect, useRef, useState} from 'react';
import TextField from "@mui/material/TextField";
import {client} from "../../lib/api/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Stack,
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";


// 등록알림창
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddProduct() {
    interface formInterface {
        isModify: boolean,
        g_owner: string,
        g_name: string,
        g_count: string,
        g_price: string,
        g_discount: string,
        g_detail: string,
        g_expireDate: string,
        g_category: string,
    }

    const initValue = {
        isModify: false,
        g_owner: '',
        g_name: '',
        g_count: '',
        g_price: '',
        g_discount: '',
        g_detail: '',
        g_expireDate: '',
        g_category: '',
    };

    const formErrorinit = {
        g_name: false,
        g_count: false,
        g_price: false,
        g_discount: false,
        g_detail: false,
        g_expireDate: false,
        g_category: false
    };


    const dispatch = useDispatch();
    const {goodsReducer, authReducer} = useSelector((state: RootState) => state);

    const [productForm, setProduct] = useState<formInterface>(initValue);
    const [formError, setFormError] = useState(formErrorinit);

    const fileInputTag = useRef<HTMLInputElement>(null);


    useEffect(() => {
        setProduct({...productForm, ...goodsReducer, g_owner: authReducer.o_sNumber}); // 리듀서에 저장된 사업자번호 불러옴
        return () => {
            dispatch({type: 'modifyOK'});
        }
    }, []);

    /// 알림창
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        submitForm();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const submitForm = async () => {
        const URL = '/owner/addGoods'
        const formData = new FormData();

        let actionType = 'new';
        if (goodsReducer.isModify) actionType = 'update'

        // @ts-ignore
        formData.append('file', fileInputTag.current.files[0]);
        formData.append('g_code', goodsReducer.g_code);
        formData.append('g_owner', productForm.g_owner);
        formData.append('g_name', productForm.g_name);
        formData.append('g_count', productForm.g_count);
        formData.append('g_price', productForm.g_price);
        formData.append('g_discount', productForm.g_discount);
        formData.append('g_detail', productForm.g_detail);
        formData.append('g_expireDate', productForm.g_expireDate);
        formData.append('g_category', productForm.g_category);

        formData.append('actionType', actionType);

        try {
            const res = await client.post(URL, formData);
            alert(actionType + '성공');
            dispatch({type: 'modifyOK'});
            setProduct(initValue);
            console.log(res);
        } catch (e) {
            alert(actionType + '실패');
            console.log(e);
        }
    };

    // 아이디값을 가져와서 state 값을 업데이트 해준다
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(productForm);
        const tagName = (e.target as HTMLFormElement).name;
        setProduct({...productForm, [tagName]: (e.target as HTMLFormElement).value});
        // formValidate();
    };


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
                    error={formError.g_name}
                    required
                    id="outlined-required"
                    label="상품 이름"
                    name={'g_name'}
                    value={productForm.g_name}
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
                    value={productForm.g_count}
                />

                <label>상품 이미지파일</label><p/>
                <input type={'file'} ref={fileInputTag}/>
                <select name={'g_category'} value={productForm.g_category}>
                    <option value={""}>상품분류 선택</option>
                    <option value={"카페/음료"}>카페/음료</option>
                    <option value={"냉동식품"}>냉동식품</option>
                    <option value={"스낵류"}>스낵류</option>
                    <option value={'과자류'}>과자류</option>
                </select>

                <TextField
                    error={formError.g_price}
                    required
                    id="outlined-required"
                    label="상품정가"
                    name={'g_price'}
                    value={productForm.g_price}
                />
                <TextField
                    error={formError.g_discount}
                    required
                    id="outlined-required"
                    label="할인가"
                    name={'g_discount'}
                    value={productForm.g_discount}
                />
                <TextField
                    error={formError.g_expireDate}
                    required
                    id="outlined-required"
                    label="유통기한"
                    name={'g_expireDate'}
                    value={productForm.g_expireDate}
                />
                <TextField
                    error={formError.g_detail}
                    required
                    id="outlined-required"
                    label="상세설명"
                    name={'g_detail'}
                    value={productForm.g_detail}
                />
                {goodsReducer.isModify ?
                    <Button onClick={handleClickOpen} variant="outlined">
                        상품 수정 하기
                    </Button>
                    :
                    <Button variant="outlined" onClick={handleClickOpen}>
                        상품 등록하기
                    </Button>}
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"다시 한 번 확인해 주세요 "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            상품을 등록 하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>아니요</Button>
                        <Button onClick={handleClickOpen}>예</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </>
    )
}
