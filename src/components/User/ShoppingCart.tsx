import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {client} from "../../lib/api/client";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {Button} from "@mui/material";

export default function ShoppingCart() {

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

    type ShoppingCartDTO = {
        g_code: number,
        g_count: number,
        g_name: string,
        g_status: number,
        g_price: number,
        g_discount: number,
        g_image: string,
        o_name: string,
        u_id: string,
    }

    const initData = {
        g_code: 0,
        g_count: 0,
        g_name: '',
        g_status: 0,
        g_price: 0,
        g_discount: 0,
        g_image: '',
        o_name: '',
        u_id: '',
    }

    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    const {cartReducer} = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    type cookieType = { g_count: string, g_code: string, id: string };

    const [list, setList] = useState<ShoppingCartDTO[]>([initData]);

    const [isCookie, setIsCookie] = useState(false);

    useEffect(() => {
        readCookie();
    }, []);


    const readCookie = () => {
        console.log('쿠키 읽기 시작');
        if (cookies.cart) {
            if (Array.isArray(cookies.cart)) if (cookies.cart.length === 0) {
                setIsCookie(false);
                console.log('쿠키가 빈 배열이다');
                return false;
            }
            const g_codeArr = cookies.cart.map((data: cookieType) => Number(data.g_code));
            console.log('쿠키에서 읽어온 g_code 배열 : ', g_codeArr);
            initialize(g_codeArr);
            setIsCookie(true);
        } else {
            console.log('쿠키 없음');
            setIsCookie(false);
        }

    }

    const initialize = async (input: number[]) => {
        const URL = '/common/shoppingcart';
        try {
            const res = await client.post(URL, input);
            setList(res.data);
            dispatch({type: 'cartIn', payload: res.data});

        } catch (e) {
            console.log(e);
        }
    };

    const removeItem = (g_code: number, idx: number) => {

        const cp = [...list];
        cp.splice(idx, 1);
        setList(cp);

        const cookieCart = [...cookies.cart];
        const removeIDX = cookieCart.findIndex((x: any) => x.g_code == g_code);
        cookieCart.splice(removeIDX, 1);
        setCookie('cart', cookieCart, {path: '/'});

    }


    const plus = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {
        const cp = [...list];
        if (cp[idx].g_count >= cookies.cart[idx].g_count){
            alert(`최대 ${cookies.cart[idx].g_count}개 구매 가능합니다`);
            return false;
        }
        cp[idx].g_count += 1;
        setList(cp);
    }

    const minus = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {
        const cp = [...list];
        if(cp[idx].g_count <= 1)return false;
        cp[idx].g_count -= 1;
        setList(cp);
    }


    const ListBuilder = (props: { data: ShoppingCartDTO, idx: number }) => {

        return (
            <>
                <hr/>
                <div>
                    상품명 : {props.data.g_name}
                </div>
                <div>
                    가격 : {props.data.g_price}원
                    할인가:{props.data.g_discount}원
                </div>
                <div>
                    {props.data.g_status === 0 ? '구매 가능!' : '품절'}
                </div>
                담긴 수량 :
                <span id={`${props.data.g_count}`} style={{fontSize: '30px'}}
                      onClick={e => plus(e, props.idx)}>➕</span>
                {props.data.g_count}
                <span id={`${props.data.g_count}`} style={{fontSize: '30px'}}
                      onClick={e => minus(e, props.idx)}>➖</span>
                <div>
                    <img style={{width: '200px', height: '200px'}} src={props.data.g_image} alt={'상품이미지'}/>
                </div>
                <Button variant={'contained'} name={`${props.idx}`}
                        onClick={() => removeItem(props.data.g_code, props.idx)}>상품
                    삭제</Button>
            </>
        )
    }

    return (
        <DivContainer>

            <button onClick={() => console.log(list)}> 테스트</button>
            <div>장바구니</div>
            {
                isCookie &&
                <>
                    <hr/>
                    <hr/>
                    <div>
                        {list.length === 0 || `가게명 : ${list[0].o_name}`}
                    </div>

                    {list.map((data: ShoppingCartDTO, idx: number) => <ListBuilder data={data} idx={idx}
                                                                                   key={idx}/>)}

                    <br/>
                    {list.length === 0 || <Button variant={'contained'}>주문하기</Button>}
                </>
            }

        </DivContainer>
    )
}
