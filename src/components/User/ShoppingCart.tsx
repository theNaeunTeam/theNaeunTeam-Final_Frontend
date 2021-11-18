import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {client} from "../../lib/api/client";
import styled from "styled-components";

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

    type goodsDTO = {
        g_owner: string,
        g_code: number,
        g_name: string,
        g_count: number,
        g_price: number,
        g_discount: number,
        g_detail: string,
        g_image: string,
        g_expireDate: string,
        g_status: number,
        g_category: string,
    }

    const dummyData = {
        g_owner: '123',
        g_code: 2,
        g_name: '홈런볼',
        g_count: 5,
        g_price: 500,
        g_discount: 300,
        g_detail: '상세정보',
        g_image: 'https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EB%A0%88%ED%8A%B8%EB%A1%9C%EB%8B%AC%EB%A0%A5-2021-11-pc.jpg',
        g_expireDate: '2020-07-09',
        g_status: 0,
        g_category: '과자류',
    }

    const [cookies, setCookie] = useCookies(['cart']);

    type cookieType = { g_count: string, g_code: string, id: string };

    const [list, setList] = useState<goodsDTO[]>([]);


    useEffect(() => {
        const g_codeArr = cookies.cart.map((data: cookieType) => Number(data.g_code));
        console.log('쿠키에서 읽어온 g_code 배열 : ', g_codeArr);
        initialize(g_codeArr);
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

    const ListBuilder = (props: { data: goodsDTO, idx: number }) => {

        return (
            <>
                {props.data.g_name}
            </>
        )
    }

    return (
        <DivContainer>
            <div>장바구니</div>
            <hr/>
            <div>전체선택</div>
            <hr/>
            {list.map((data: goodsDTO, idx: number) => <ListBuilder data={data} idx={idx} key={idx}/>)}
        </DivContainer>
    )
}
