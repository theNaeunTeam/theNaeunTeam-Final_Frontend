import React from 'react';
import AddTaskIcon from "@mui/icons-material/AddTask";
import {cartReducerType, orderFormType, orderSubmitType} from "../../lib/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import Button from "@mui/material/Button";
import styled from "styled-components";
import {RouteComponentProps} from "react-router-dom";

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

export default function OrderSuccess(props: {
    cartReducer: cartReducerType[];
    orderForm: orderFormType;
    arr: orderSubmitType[];
    history: RouteComponentProps["history"];
}) {

    const {
        cartReducer,
        orderForm,
        arr,
        history,
    } = props;

    return (
        <OrderSuccessDiv>
            <h1><AddTaskIcon/> 예약이 완료되었습니다</h1>
            <span style={{display: 'flex'}}>
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
                            onClick={() => history.replace('/user/userreserve')}
                    >주문내역</Button>
                    </span>
        </OrderSuccessDiv>
    )
}