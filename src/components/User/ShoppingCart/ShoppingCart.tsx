import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {client} from "../../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import {ShoppingCartDTO} from "../../../lib/types";
import CircularProgress from '@mui/material/CircularProgress';
import '../../../lib/styles/shoppingCart.scss';
import {ShoppingCartListBuilder} from "./ShoppingCartListBuilder";

export default function ShoppingCart() {

    const defaultValue = [{
        g_code: 0,
        g_count: 0,
        g_name: '',
        g_status: 0,
        g_price: 0,
        g_discount: 0,
        g_image: '',
        o_name: '',
        u_id: '',
    }];

    const history = useHistory();

    const [cookies, setCookie] = useCookies(['cart']);
    const [temp, setTemp] = useState<ShoppingCartDTO[]>(defaultValue);
    const [loading, setLoading] = useState(true);
    const {cartReducer} = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    type cookieType = { g_count: string, g_code: string, id: string };

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);
    useEffect(() => {
        readCookie();
    }, []);


    const readCookie = () => {
        if (cookies.cart) {
            if (Array.isArray(cookies.cart)) if (cookies.cart.length === 0) {
                setLoading(false);
                return false;
            }
            const g_codeArr = cookies.cart.map((data: cookieType) => Number(data.g_code));
            initialize(g_codeArr);
        } else {
            setLoading(false);
        }
    }

    const initialize = async (input: number[]) => {
        const g_countArr = cookies.cart;

        const URL = '/common/shoppingcart';
        try {
            const res = await client.post(URL, input);
            const massage = res.data.map((x: ShoppingCartDTO) => {
                const findCookieIDX = g_countArr.findIndex((y: any) => y.g_code == x.g_code);
                return {...x, g_count: g_countArr[findCookieIDX].g_count}
            });
            dispatch({type: 'cartIn', payload: massage});

            setTemp(JSON.parse(JSON.stringify(res.data)));
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const removeItem = (g_code: number, idx: number) => {

        dispatch({type: 'removeItem', payload: idx});

        const cookieCart = [...cookies.cart];
        const removeIDX = cookieCart.findIndex((x: any) => x.g_code == g_code);
        cookieCart.splice(removeIDX, 1);
        setCookie('cart', cookieCart, {path: '/'});

    }


    const plus = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {

        const cp = [...cartReducer];
        if (cp[idx].g_count >= temp[idx].g_count) {
            alert(`최대 ${temp[idx].g_count}개 구매 가능합니다`);
            return false;
        }
        cp[idx].g_count += 1;
        dispatch({type: 'modifyItem', payload: cp})
    }

    const minus = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {

        const cp = [...cartReducer];
        if (cp[idx].g_count <= 1) return false;
        cp[idx].g_count -= 1;
        dispatch({type: 'modifyItem', payload: cp})
    }


    return (
        <div className={'cartDivContainer'}>
            <strong
                style={{fontSize: 'x-large'}}>{cartReducer.length === 0 || `${cartReducer[0].o_name}에서 담은 `}장바구니</strong>
            {cartReducer.length ?
                <>
                    <br/>
                    {cartReducer.map((data: ShoppingCartDTO, idx: number) => <ShoppingCartListBuilder data={data}
                                                                                                      idx={idx}
                                                                                                      key={idx}
                                                                                                      minus={minus}
                                                                                                      plus={plus}
                                                                                                      removeItem={removeItem}/>)}
                    <br/>
                    <div style={{fontWeight: 'bold', fontSize: 'larger'}}>
                        총 주문 상품 수 : {cartReducer.length} 개, {' '}
                        {cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0)}원
                    </div>
                    <br/>
                    <div style={{textAlign: 'center', marginBottom: '100px'}}>
                        <button className='cartBtn1' onClick={() => {
                            dispatch({type: 'orderIn'});
                            history.push('/user/order');
                        }}><h3>주문하기</h3></button>
                    </div>
                </>
                :
                <>
                    <div>
                        {
                            loading ? <CircularProgress/> :
                                <>
                                    <div>
                                        <br/>
                                        <div>장바구니에 담긴 상품이 없습니다.</div>
                                        <br/>
                                        <div><Button onClick={() => history.push('/')}>메인페이지로 돌아가기</Button></div>
                                    </div>
                                </>
                        }
                    </div>
                </>
            }

        </div>
    )
}