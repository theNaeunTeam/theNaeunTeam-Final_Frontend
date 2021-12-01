import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {useCookies} from "react-cookie";
import {orderForm, orderSubmitType} from "../../../modules/types";
import {client} from "../../../lib/api/client";
import './order.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const DivContainer = styled.div`
  border: solid 0.5px green;
  border-radius: 10px;
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  text-align: center;
  margin: auto;
  width: 50%;
  padding: 10px;
  vertical-align: center;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const DivBordered = styled.div`
  border-top: solid ghostwhite 10px;
  padding: 20px;
  text-align: left;
`;

export default function Order() {
    const today = new Date();

    const defaultValue = {
        who: ' 제가 직접 받아요 ',
        time: '18:00',
        r_customOrder: '',
        payment: 'self',
        tumbler: '',
        kudasai: '',
        r_firstDate: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
    }

    const history = useHistory();

    const dispatch = useDispatch();
    const {cartReducer, authReducer} = useSelector((state: RootState) => state);
    const [orderForm, setOrderForm] = useState<orderForm>(defaultValue);
    const [cookies, setCookie, removeCookie] = useCookies(['cart']); // 건들지 말것

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.push('/err');
        if (cartReducer[0] === undefined) history.push('/err');
    }, []);

    useEffect(() => {
        return () => {
            dispatch({type: 'orderOut'});
        }
    }, []);

    const submitForm = () => {
        const URL = '/user/orderConfirm';

        const arr: orderSubmitType[] = [];

        for (let i = 0; i < cartReducer.length; i++) {
            const data: orderSubmitType = {
                r_firstDate: orderForm.r_firstDate,
                r_u_id: authReducer.u_id,
                r_g_code: cartReducer[i].g_code,
                r_firstTime: orderForm.time,
                r_count: cartReducer[i].g_count,
                r_customOrder: orderForm.who + orderForm.tumbler + orderForm.r_customOrder,
                r_owner: cookies.cart[0].o_sNumber,
                r_pay: cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0),
            }
            arr.push(data);
        }
        console.log('서버로 보내는 배열 : ', arr);

        client.post(URL, arr)
            .then(res => {
                console.log(res);
                dispatch({type: 'orderOut'});
                removeCookie('cart', {path: '/'});
                if (res.data === false) {
                    alert('노쇼 카운트 5 이상이므로 주문 불가능 합니다. ')
                } else {
                    alert('성공');
                }

                history.push('/');
            })
            .catch(err => {
                console.log(err);
                alert('실패');
            })
    };

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {

        const tagName = (e.target as HTMLFormElement).id;

        if (tagName === 'kudasai' || tagName === 'tumbler') {
            if (!(e.target as HTMLFormElement).checked) (e.target as HTMLInputElement).value = '';
        }

        setOrderForm({...orderForm, [tagName]: (e.target as HTMLFormElement).value});
        console.log(orderForm);
    }

    return (
        <>
            <DivContainer>
                <form onSubmit={e => e.preventDefault()} onChange={e => handleFormChange(e)}>
                    <h1>주문서</h1>
                    <br/>
                    <hr/>
                    {cartReducer.map((data, idx) =>
                        <div className={'cartListItem'}>
                            <img src={data.g_image} style={{width: '100px', height: '100px'}} alt={'상품이미지'}/>
                            <span>{data.g_name}</span>
                            <span>{data.g_count}개 </span>
                            <span>{data.g_discount * data.g_count}원</span>
                        </div>
                    )}
                    <br/>
                    <Button onClick={() => history.replace('/')}><h3>+ 상품 더 담기 </h3></Button>
                    <br/><br/>
                    <DivBordered>
                        <div className='orderLeftSide'>
                            <h3>방문하시는분</h3>

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
                            <h3>방문 예정 시간</h3>
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
                            sx={{width: 200}}
                        />
                                {' '}
                                <TextField
                                    name={'r_firstDate'}
                                    id="r_firstDate"
                                    label="방문 예정 일자"
                                    type="date"
                                    defaultValue={orderForm.r_firstDate}
                                    sx={{width: 200}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{inputProps: {min: orderForm.r_firstDate}}}
                                />
                        </span>
                        </div>
                    </DivBordered>
                    <DivBordered>
                        <div className='orderLeftSide'>
                            <h3> 요청사항 </h3>
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
                    {/*<DivBordered>*/}
                    {/*    <strong>주문서 쿠폰 / 포인트 사용</strong>*/}
                    {/*    <br/><br/>*/}
                    {/*    할인쿠폰*/}
                    {/*    <br/>*/}
                    {/*    <input disabled={true}/>*/}
                    {/*    <button disabled={true}>쿠폰 선택</button>*/}
                    {/*    <br/>*/}
                    {/*    <input disabled={true}/>*/}
                    {/*    <button disabled={true}>모두 사용</button>*/}
                    {/*    <br/>*/}
                    {/*    보유 0p*/}
                    {/*</DivBordered>*/}
                    <DivBordered>
                        {/*<strong>총 결제 금액</strong>*/}
                        {/*<div style={{display: "flex", justifyContent: 'space-between'}}>*/}
                        {/*    <span>총 주문금액</span>*/}
                        {/*    <span>{cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0)}원</span>*/}
                        {/*</div>*/}
                        {/*<div style={{display: "flex", justifyContent: 'space-between'}}>*/}
                        {/*    <span>주문서 쿠폰</span>*/}
                        {/*    <span>0원</span>*/}
                        {/*</div>*/}
                        {/*<div style={{display: "flex", justifyContent: 'space-between'}}>*/}
                        {/*    <span>더나은포인트</span>*/}
                        {/*    <span>0원</span>*/}
                        {/*</div>*/}
                        {/*<hr/>*/}
                        <h3>총 결제 금액</h3>
                        <br/><br/>
                        <div style={{background: "ghostwhite", display: "flex", justifyContent: 'space-between'}}>
                            <span>적립 예정 금액</span>
                            <span>{cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0) / 10}원</span>
                        </div>
                        <div style={{background: "ghostwhite", display: "flex", justifyContent: 'space-between'}}>
                            <strong>최종혜택가</strong>
                            <strong>{cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0)}원</strong>
                        </div>
                    </DivBordered>
                    {/*<DivBordered>*/}
                    {/*    <strong>방문하시는분</strong>*/}
                    {/*    <br/>*/}
                    {/*    <input type={'radio'} name={'payment'} value={'self'} defaultChecked={true}*/}
                    {/*           id={'payment'}/> 직접 결제 {' '}*/}
                    {/*    <input type={'radio'} name={'payment'} value={'card'} disabled={true}*/}
                    {/*           id={'payment'}/> 카드결제 {' '}*/}
                    {/*    <input type={'radio'} name={'payment'} value={'mobile'} id={'payment'} disabled={true}/> 휴대폰 결제*/}
                    {/*</DivBordered>*/}
                    <br/>
                    <Button variant={'contained'} onClick={submitForm} style={{width: '50%'}}><h2>주문하기</h2></Button>
                </form>
            </DivContainer>

        </>
    )
}
