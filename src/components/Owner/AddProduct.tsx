import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Stack
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

const DivContainer = styled.div`
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
  text-align: center;
`;

export default function AddProduct(props: { loading: any; handleForm: any; g_name: any; productForm: any; g_count: any; g_category: any; setProduct: any; g_price: any; g_discount: any; today: any; g_detail: any; fileDiv: any; fileInputTag: any; g_expireDate: any; goodsReducer: any; handleClickOpen: any; open: any; Transition: any; handleClose: any; twoWeekLater:any}) {

    const {
        loading,
        handleForm,
        g_name,
        productForm,
        g_count,
        g_category,
        setProduct,
        g_price,
        g_discount,
        today,
        g_detail,
        fileDiv,
        fileInputTag,
        g_expireDate,
        goodsReducer,
        handleClickOpen,
        open,
        Transition,
        handleClose,
        twoWeekLater

    } = props;

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
                    InputProps={{inputProps: {min: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`,
                        max: `${twoWeekLater.getFullYear()}-${('0' + (twoWeekLater.getMonth() + 1)).slice(-2)}-${('0' + twoWeekLater.getDate()).slice(-2)}`}}}
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