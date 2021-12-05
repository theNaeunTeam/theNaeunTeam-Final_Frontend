import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import TextField from "@mui/material/TextField";
import {client} from "../../lib/api/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Slide,
    Stack,
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {addProductType} from "../../lib/types";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";


// 등록알림창
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DivContainer = styled.div`
  //border: solid black;
  //display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
  text-align: center;
`;
export default function AddProduct() {
    const fileDiv = useRef(null);

    const {goodsReducer, authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();

    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const today = new Date();

    const initValue = {
        isModify: false,
        g_owner: '',
        g_name: '',
        g_count: '',
        g_price: '',
        g_discount: '',
        g_detail: '',
        g_expireDate: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`,
        g_category: '마실것',
    };

    const dispatch = useDispatch();

    const fileInputTag = useRef<HTMLInputElement>(null);

    const [productForm, setProduct] = useState<addProductType>(initValue);
    const [loading, setLoading] = useState(false);

    const [g_name, setG_name] = useState(false);
    const [g_count, setG_count] = useState(false);
    const [g_price, setG_price] = useState(false);
    const [g_discount, setG_discount] = useState(false);
    const [g_detail, setG_detail] = useState(false);
    const [g_expireDate, setG_expireDate] = useState(false);
    const [g_category, setG_category] = useState(false);

    useEffect(() => {
        setProduct({...productForm, ...goodsReducer, g_owner: authReducer.o_sNumber}); // 리듀서에 저장된 사업자번호 불러옴
        return () => {
            dispatch({type: 'modifyOK'});
        }
    }, []);

    useEffect(() => {
        fomValidate();
    }, [productForm])

    const fomValidate = (): boolean => {
        if (productForm.g_name == '') {
            setG_name(true);
            return false;
        }
        setG_name(false);

        if (Number(productForm.g_count) === 0) {
            setG_count(true);
            return false;
        }
        setG_count(false);

        if (productForm.g_category == '') {
            setG_category(true);
            return false;
        }
        setG_category(false);

        if (Number(productForm.g_price) === 0) {
            setG_price(true);
            return false;
        }
        setG_price(false);

        if (Number(productForm.g_discount) === 0) {
            setG_discount(true);
            return false;
        }
        setG_discount(false);
        if (productForm.g_expireDate == '') {
            setG_expireDate(true);
            return false;
        }
        setG_expireDate(false);

        return true;
    };

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
        if (!fomValidate()) {
            alert('제출 양식을 확인해주세요');
            return false;
        }

        // @ts-ignore
        if (fileInputTag.current.files.length === 0) {
            if (fileDiv.current) (fileDiv.current as HTMLDivElement).style.border = '1px solid red';
            alert('파일을 첨부해주세요');
            return false;
        }

        setLoading(true)
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

            const result = '';
            if (actionType === 'new') {
                alert("상품 등록 되었습니다.");
            } else {
                alert("상품 수정 되었습니다.");
            }
            dispatch({type: 'modifyOK'});
            setProduct(initValue);
            console.log(res);
        } catch (e: any) {
            const err = e.response;
            if (err.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.');

            } else if (err.status === 400) {
                alert(err.data.error);
            } else {
                alert('예상치 못한 에러로 인해 작업 실패하였습니다.\n잠시 후 다시 시도 바랍니다.');
            }
            console.log(e);
        }
        setLoading(false);
    };

    // 아이디값을 가져와서 state 값을 업데이트 해준다
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(productForm);
        const tagName = (e.target as HTMLFormElement).name;
        setProduct({...productForm, [tagName]: (e.target as HTMLFormElement).value});
        // ownerFormValidate();
    };


    return (
        <DivContainer>
            <h1 style={{marginBottom: '50px'}}>상품등록</h1>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
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
                    error={g_name}
                    required
                    id="outlined-required"
                    label="상품 이름"
                    name={'g_name'}
                    value={productForm.g_name}
                />
                <TextField
                    error={g_count}
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
                <FormControl sx={{m: 1, minWidth: 500}}>
                    <InputLabel id="demo-simple-select-helper-label">상품 분류 선택</InputLabel>
                    <Select
                        error={g_category}
                        name={'g_category'}
                        labelId="demo-simple-select-helper-label"
                        value={productForm.g_category}
                        label="상품 분류 선택"
                        onChange={e => {
                            setProduct({...productForm, g_category: e.target.value});
                        }}
                    >
                        <MenuItem value={'마실것'}>마실것</MenuItem>
                        <MenuItem value={'신선식품'}>신선식품</MenuItem>
                        <MenuItem value={'가공식품'}>가공식품</MenuItem>
                        <MenuItem value={'냉동식품'}>냉동식품</MenuItem>
                        <MenuItem value={'조리/반조리'}>조리/반조리</MenuItem>
                        <MenuItem value={'식품외 기타'}>식품외 기타</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    error={g_price}
                    required
                    id="outlined-required"
                    label="상품정가"
                    name={'g_price'}
                    value={productForm.g_price}
                />
                <TextField
                    error={g_discount}
                    required
                    id="outlined-required"
                    label="할인가"
                    name={'g_discount'}
                    value={productForm.g_discount}
                />
                <TextField
                    required
                    error={g_expireDate}
                    name='g_expireDate'
                    id='g_expireDate'
                    label="유통기한"
                    type="date"
                    defaultValue={productForm.g_expireDate}
                    sx={{width: 200}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{inputProps: {min: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`}}}
                />
                <TextField
                    error={g_detail}
                    id="outlined-required"
                    label="상세설명"
                    name={'g_detail'}
                    value={productForm.g_detail}
                    multiline={true}
                    rows={5}
                />
                <div style={{
                    border: 'solid lightgrey 0.5px', borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '20px', padding: '10px', width: '500px', height: '55px'
                }}
                     ref={fileDiv}>
                    <label>상품 이미지파일</label><p/>
                    <input type={'file'} ref={fileInputTag}/>
                </div>
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

        </DivContainer>
    )
}
