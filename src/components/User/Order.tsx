import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {useCookies} from "react-cookie";
import {orderForm, orderSubmitType} from "../../modules/types";
import {client} from "../../lib/api/client";

const DivContainer = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: auto;
  width: 50%;
  padding: 10px;
`;

const DivBorderd = styled.div`
  border-top: solid lightgray 10px;
  padding: 10px;
  text-align: left;
`;

export default function Order() {

    const defaultValue = {
        who: '제가 직접 받음',
        time: '18:00',
        r_customOrder: '',
        payment: 'self',
        tumbler: '',
        kudasai: '',

    }

    const history = useHistory();
    const dispatch = useDispatch();
    const {cartReducer, authReducer} = useSelector((state: RootState) => state);
    const [orderForm, setOrderForm] = useState<orderForm>(defaultValue);
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    useLayoutEffect(() => {
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
                if(res.data === false){
                    alert('노쇼 카운트 5 이상이므로 주문 불가능 합니다. ')
                }else{
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
                    <div>주문하기</div>
                    <hr/>
                    {cartReducer.map((data, idx) =>
                        <div key={idx}>
                            <img src={data.g_image} style={{width: '50px', height: '50px'}}/>
                            {data.g_name} {data.g_count}개 {data.g_discount * data.g_count}원
                        </div>
                    )}
                    <div> + 상품 더 담기</div>
                    <DivBorderd>
                        <strong>방문하시는분</strong>
                        <br/>
                        <input type={'radio'} defaultChecked={true} name={'who'} value={' 제가 직접 받음 '} id={'who'}/> 제가 직접
                        받음
                        <br/>
                        <input type={'radio'} name={'who'} value={' 딴사람이 받음 '} id={'who'}/> 딴사람이 받음
                    </DivBorderd>
                    <DivBorderd>
                        <strong>방문 예정 시간</strong>
                        <br/><br/>
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
                            sx={{width: 300}}
                        />
                    </DivBorderd>
                    <DivBorderd>
                        <strong>요청사항</strong>
                        <br/>
                        가게 사장님에게
                        <br/>
                        <textarea id={'r_customOrder'} rows={5} cols={50}/>
                        <br/>
                        <input type={'checkbox'} id={'kudasai'} value={'일회용 수저, 포크 제외'}/>일회용 수저, 포크 제외
                        <br/>
                        <input type={'checkbox'} id={'tumbler'} value={'텀블러 가져감'}/> 텀블러 가져감
                    </DivBorderd>
                    <DivBorderd>
                        <strong>주문서 쿠폰 / 포인트 사용</strong>
                        <br/><br/>
                        할인쿠폰
                        <br/>
                        <input disabled={true}/>
                        <button disabled={true}>쿠폰 선택</button>
                        <br/>
                        <input disabled={true}/>
                        <button disabled={true}>모두 사용</button>
                        <br/>
                        보유 0p
                    </DivBorderd>
                    <DivBorderd>
                        <strong>총 결제금액</strong>
                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                            <span>총 주문금액</span>
                            <span>{cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0)}원</span>
                        </div>
                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                            <span>주문서 쿠폰</span>
                            <span>0원</span>
                        </div>
                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                            <span>더나은포인트</span>
                            <span>0원</span>
                        </div>
                        <hr/>
                        <strong>총 결제 금액</strong>
                        <div style={{background: "lightgray", display: "flex", justifyContent: 'space-between'}}>
                            <span>적립혜택</span>
                            <span>0원</span>
                        </div>
                        <div style={{background: "lightgray", display: "flex", justifyContent: 'space-between'}}>
                            <strong>최종혜택가</strong>
                            <strong>{cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0)}원</strong>
                        </div>
                    </DivBorderd>
                    <DivBorderd>
                        <strong>방문하시는분</strong>
                        <br/>
                        <input type={'radio'} name={'payment'} value={'self'} defaultChecked={true}
                               id={'payment'}/> 직접 결제
                        <input type={'radio'} name={'payment'} value={'card'} disabled={true}
                               id={'payment'}/> 카드결제
                        <input type={'radio'} name={'payment'} value={'mobile'} id={'payment'} disabled={true}/> 휴대폰 결제
                    </DivBorderd>
                    <Button variant={'contained'} onClick={submitForm}>주문하기</Button>
                </form>
            </DivContainer>

        </>
    )
}
