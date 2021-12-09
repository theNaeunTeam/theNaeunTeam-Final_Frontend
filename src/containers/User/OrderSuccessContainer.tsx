import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {cartReducerType, orderForm, orderSubmitType} from "../../lib/types";
import {useCookies} from "react-cookie";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import styled from "styled-components";

const OrderSuccessDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fafafa;
`

export default function OrderSuccessContainer() {

    const defaultValue = {
        who: '',
        time: '',
        r_customOrder: '',
        payment: '',
        tumbler: '',
        kudasai: '',
        r_firstDate: '',
    }

    const location = useLocation();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['cart']); // 건들지 말것
    const [orderForm, setOrderForm] = useState<orderForm>(defaultValue);
    const [arr, setArr] = useState<orderSubmitType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartReducer, setCartReducer] = useState<cartReducerType[]>([]);

    useEffect(() => {
        if (location.state === undefined) {
            history.replace('/err');
        } else {
            const {
                orderForm,
                arr,
                cartReducer
            } = location.state as { orderForm: orderForm, arr: orderSubmitType[], cartReducer: cartReducerType[] };
            setArr(arr);
            setOrderForm(orderForm);
            setCartReducer(cartReducer);
            setIsLoading(false);
            removeCookie('cart', {path: '/'});
            window.scrollTo({
                top: 0,
            });
        }
    }, []);

    return (
        <>
            {
                isLoading ||
                <OrderSuccessDiv>
                    <h1><AddTaskIcon/> 예약이 완료되었습니다</h1>
                    <span style={{display:'flex'}}>
                    {cartReducer.map((data: cartReducerType, i: number) => {
                        return (
                            <Card sx={{maxWidth: 345, m: 5}}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={cartReducer[i].g_image}
                                    alt="상품이미지"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {cartReducer[i].g_name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {cartReducer[i].g_count}개 {cartReducer[i].g_discount * cartReducer[i].g_count}원
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                    </span>
                    <span><AccessTimeIcon/> 방문예정시간 : {orderForm.r_firstDate} {orderForm.time}</span>
                    <span><ReceiptLongIcon/> 요청사항 : {arr[0].r_customOrder}</span>
                    <span><PaymentIcon/> 총 결제 예정 금액 : {arr[0].r_pay}</span>
                    <span>
                    <Button variant={"outlined"} size={'large'} color={'info'} sx={{m: 3, p: 2}}
                            onClick={() => history.replace('/')}
                    >홈페이지</Button>
                    <Button variant={"outlined"} size={'large'} color={'info'} sx={{m: 3, p: 2}}
                            onClick={() => history.replace('/user/userreserve')}>주문내역</Button>
                    </span>
                </OrderSuccessDiv>
            }
        </>
    )
}