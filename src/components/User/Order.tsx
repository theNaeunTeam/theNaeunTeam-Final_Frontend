import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {useCookies} from "react-cookie";
import {orderType} from "../../modules/types";

export default function Order() {

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


    const history = useHistory();
    const dispatch = useDispatch();
    const {cartReducer, authReducer} = useSelector((state: RootState) => state);
    const [orderForm, setOrderForm] = useState<orderType[]>([]);
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    useLayoutEffect(() => {

    }, [])

    useEffect(() => {

        setOrderForm([{
            r_u_id: authReducer.u_id,
            r_g_code: 0,
            r_firstTime: '',
            r_count: 0,
            r_customOrder: '',
            r_owner: '',
            r_pay: cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0),
        }]);

        return () => {
            dispatch({type: 'orderOut'});
            removeCookie('cart', {path: '/'});
        }
    }, []);

    const submitForm = () => {

        const arr = [];

        for (let i = 0; i < cartReducer.length; i++) {

            const data: orderType = {
                r_u_id: authReducer.u_id,
                r_g_code: cartReducer[i].g_code,
                r_firstTime: '',
                r_count: cartReducer[i].r_count,
                r_customOrder: '',
                r_owner: '',
                r_pay: 0,
            }

            arr.push(data);
        }


    };

    return (
        <DivContainer>
            <form onSubmit={e => e.preventDefault()}>
                <div>주문하기</div>
                <hr/>
                <div> + 상품 더 담기</div>
                <DivBorderd>
                    <strong>방문하시는분</strong>
                    <br/>
                    <input type={'radio'}/> 제가 직접 받음
                    <br/>
                    <input type={'radio'}/> 딴사람이 받음
                </DivBorderd>
                <DivBorderd>
                    <strong>방문 예정 시간</strong>
                    <br/><br/>
                    <TextField
                        name={'o_time2'}
                        id="time"
                        label="영업 종료 시간"
                        type="time"
                        defaultValue="00:00"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 600, // 10 min
                        }}
                        sx={{width: 300}}
                    />
                </DivBorderd>
                <DivBorderd>
                    <strong>요청사항</strong>
                    <br/>
                    가게 사장님에게
                    <br/>
                    <textarea/>
                    <br/>
                    <input type={'checkbox'}/>일회용 수저, 포크 제외
                    <br/>
                    <input type={'checkbox'}/> 텀블러 가져감
                </DivBorderd>
                <DivBorderd>
                    <strong>주문서 쿠폰 / 포인트 사용</strong>
                    <br/><br/>
                    할인쿠폰
                    <br/>
                    <input/>
                    <button>쿠폰 선택</button>
                    <br/>
                    <input/>
                    <button>모두 사용</button>
                    <br/>
                    보유 0p
                </DivBorderd>
                <DivBorderd>
                    <strong>총 결제금액</strong>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <span>총 주문금액</span>
                        <span>4400원</span>
                    </div>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <span>주문서 쿠폰</span>
                        <span>0원</span>
                    </div>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <span>더나온포인트</span>
                        <span>0원</span>
                    </div>
                    <hr/>
                    <strong>총 결제 금액</strong>
                    <div style={{background: "lightgray", display: "flex", justifyContent: 'space-between'}}>
                        <span>적립혜택</span>
                        <span>440원</span>
                    </div>
                    <div style={{background: "lightgray", display: "flex", justifyContent: 'space-between'}}>
                        <strong>최종혜택가</strong>
                        <strong>3960원</strong>
                    </div>
                </DivBorderd>
                <DivBorderd>
                    <strong>방문하시는분</strong>
                    <br/>
                    <input type={'radio'}/> 카드결제
                    <input type={'radio'}/> 휴대폰 결제
                </DivBorderd>
                <Button variant={'contained'}>주문하기</Button>
            </form>
        </DivContainer>
    )
}
