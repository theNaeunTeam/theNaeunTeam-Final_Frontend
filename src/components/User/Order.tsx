import React from "react";
import {Button} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {cartReducerType} from "../../lib/types";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HailIcon from '@mui/icons-material/Hail';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const DivBordered = styled.div`
  border-top: solid ghostwhite 10px;
  padding: 20px;
  text-align: left;
`;

export default function Order(props: {
    handleFormChange: any; cartReducer: any; history: any; orderForm: any; today: any; submitForm: any;
    o_sNumber: string; loading: boolean;
}) {

    const {
        handleFormChange,
        cartReducer,
        history,
        orderForm,
        today,
        submitForm,
        o_sNumber,
        loading,
    } = props;

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className={'OrderDivContainer'}>
                <form onSubmit={e => e.preventDefault()} onChange={e => handleFormChange(e)}>
                    <h1>주문서</h1>
                    <br/>
                    <hr/>
                    {cartReducer.map((data: cartReducerType, idx: number) =>
                        <div className={'cartListItem'}>
                            <img src={data.g_image} style={{width: '100px', height: '100px', margin: '5px'}}
                                 alt={'상품이미지'}/>
                            <span>{data.g_name}</span>
                            <span>{data.g_count}개 </span>
                            <span>{data.g_discount * data.g_count}원</span>
                        </div>
                    )}
                    <br/>
                    <Button onClick={() => history.replace('/shopView/' + o_sNumber)}><h3>+ 상품 더 담기 </h3></Button>
                    <br/><br/>
                    <DivBordered>
                        <div className='orderLeftSide'>
                            <h3><HailIcon/>방문하시는분</h3>
                            <RadioGroup
                                row
                                aria-label="방문자"
                                defaultValue=" 제가 직접 받아요 "
                            >
                                <FormControlLabel value=" 제가 직접 받아요 " control={<Radio id={'who'}/>}
                                                  label=" 제가 직접 받아요 "/>
                                <FormControlLabel value=" 다른 사람이 받아요 " control={<Radio id={'who'}/>}
                                                  label=" 다른 사람이 받아요 "/>
                            </RadioGroup>
                        </div>
                    </DivBordered>
                    <DivBordered>
                        <div className='orderLeftSide'>
                            <h3><AccessTimeIcon/>방문시간</h3>
                            <span>
                        <TextField
                            name={'o_time2'}
                            id="time"
                            label="방문 예정 시간"
                            type="time"
                            defaultValue="18:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 3000, // 30 min
                            }}
                            sx={{width: 175}}
                        />
                                {' '}
                                <TextField
                                    name={'r_firstDate'}
                                    id="r_firstDate"
                                    label="방문 예정 일자"
                                    type="date"
                                    defaultValue={orderForm.r_firstDate}
                                    sx={{width: 175}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{inputProps: {min: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`}}}
                                />
                        </span>
                        </div>
                    </DivBordered>
                    <DivBordered>
                        <div className='orderLeftSide'>
                            <h3><ReceiptLongIcon/> 요청사항 </h3>
                            <TextField
                                id="r_customOrder"
                                label="가게 사장님에게"
                                multiline
                                rows={4}
                                style={{width: '70%'}}
                            />
                        </div>
                        <span className={'orderRightSide'}>
                        <FormControlLabel control={<Checkbox value={' 일회용 수저, 포크 제외 '} id={'kudasai'}/>}
                                          label="일회용 수저, 포크 제외"/>
                        <FormControlLabel control={<Checkbox value={' 텀블러 가져가요 '} id={'tumbler'}/>} label="텀블러 가져가요"/>
                        </span>
                    </DivBordered>

                    <DivBordered>

                        <h3><AttachMoneyIcon/> 총 결제 금액</h3>
                        <div style={{background: "ghostwhite", display: "flex", justifyContent: 'space-between'}}>
                            <span><MoneyOffIcon/> 적립 예정 금액</span>
                            <span>{cartReducer.reduce((acc: number, cur: cartReducerType) => acc + cur.g_discount * cur.g_count, 0) / 10}원</span>
                        </div>
                        <br/>
                        <div style={{background: "ghostwhite", display: "flex", justifyContent: 'space-between'}}>
                            <strong><PaymentIcon/> 최종혜택가</strong>
                            <strong>{cartReducer.reduce((acc: number, cur: cartReducerType) => acc + cur.g_discount * cur.g_count, 0)}원</strong>
                        </div>
                    </DivBordered>

                    <br/>
                    <Button disabled={loading} variant={'contained'} onClick={submitForm} style={{width: '50%'}}>
                        <h3>주문하기</h3></Button>
                </form>
            </div>
        </>
    )
}