import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {client} from "../../lib/api/client";
import styled from "styled-components";
import {useSelector} from "react-redux";
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

    const {authReducer} = useSelector((state: RootState) => state);

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
            // setList([dummyData]);

        } catch (e) {
            console.log(e);
        }
    };

    const optionTagBuilder = (g_count: number): JSX.Element[] => {
        const res = [];
        for (let i = 1; i <= g_count; i++) {
            res.push(<option value={i} key={i}>{i}개</option>);
        }
        return res;
    }

    const removeItem = (g_code: number, idx: number) => {

        const cp = [...list];
        cp.splice(idx, 1);
        setList(cp);

        const cookieCart = [...cookies.cart];
        const removeIDX = cookieCart.findIndex((x: any) => x.g_code == g_code);
        cookieCart.splice(removeIDX, 1);
        setCookie('cart', cookieCart, {path: '/'});

    }

    const modifyItem = (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
        const cp = [...list];
        cp[idx].g_count = Number(e.target.value);
        setList(cp);
    }

    const ListBuilder = (props: { data: ShoppingCartDTO, idx: number }) => {

        return (
            <>
                <hr/>
                <div>
                    상품명 : {props.data.g_name}
                    <input type={'hidden'} name={props.data.g_name} id='g_name'/>
                </div>
                <div>
                    가격 : {props.data.g_price}원
                    <input type={'hidden'} name={`${props.data.g_price}`} id='g_price'/>
                    할인가:{props.data.g_discount}원
                    <input type={'hidden'} name={`${props.data.g_discount}`} id='g_discount'/>
                </div>
                <div>
                    {props.data.g_status === 0 ? '구매 가능!' : '품절'}
                    <input type={'hidden'} name={`${props.data.g_status}`} id='g_status'/>
                </div>
                <div>
                    남은 수량 : {props.data.g_count}
                </div>
                담긴 수량 :
                <select name={`${props.data.g_count}`} id='g_count' onChange={e => modifyItem(e, props.idx)} value={props.data.g_count}>
                    {optionTagBuilder(props.data.g_count).map(data => data)}
                </select>
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
                    <form onChange={e => console.log(e)}>
                        {list.map((data: ShoppingCartDTO, idx: number) => <ListBuilder data={data} idx={idx}
                                                                                       key={idx}/>)}
                    </form>
                    <br/>
                    {list.length === 0 || <Button variant={'contained'}>주문하기</Button>}
                </>
            }

        </DivContainer>
    )
}
