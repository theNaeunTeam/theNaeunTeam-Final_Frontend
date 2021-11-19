import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {client} from "../../lib/api/client";
import styled from "styled-components";
import {authReducer} from "../../reducers/auth";
import {useSelector} from "react-redux";
import {RootState} from "../../index";

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

    const [cookies, setCookie] = useCookies(['cart']);
    const {authReducer} = useSelector((state: RootState) => state);

    type cookieType = { g_count: string, g_code: string, id: string };

    const [list, setList] = useState<ShoppingCartDTO[]>([initData]);

    const [isCookie, setIsCookie] = useState(false);

    useEffect(() => {
        if (cookies.cart) {
            const g_codeArr = cookies.cart.map((data: cookieType) => Number(data.g_code));
            console.log('쿠키에서 읽어온 g_code 배열 : ', g_codeArr);
            initialize(g_codeArr);
            setIsCookie(true);
        } else {

        }
    }, []);


    const initialize = async (input: number[]) => {

        const URL = '/common/shoppingcart';

        try {

            const res = await client.post(URL, input);

            console.log(res);

            setList(res.data);

            // setList([dummyData]);

        } catch (e) {
            console.log(e);
        }


    };

    const ListBuilder = (props: { data: ShoppingCartDTO, idx: number }) => {

        return (
            <>
                상품명:{props.data.g_name}
            </>
        )
    }

    return (
        <DivContainer>
            <form>
                <div>장바구니{isCookie || '가 비어있습니다.'}</div>
                <hr/>
                <div>전체선택</div>
                <hr/>
                <div>
                    {list[0].o_name}
                </div>
                {list.map((data: ShoppingCartDTO, idx: number) => <ListBuilder data={data} idx={idx} key={idx}/>)}
            </form>
        </DivContainer>
    )
}
