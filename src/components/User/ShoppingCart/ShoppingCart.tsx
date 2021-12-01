import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {client} from "../../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import {Button, Paper} from "@mui/material";
import {useHistory} from "react-router-dom";
import {ShoppingCartDTO} from "../../../modules/types";
import CircularProgress from '@mui/material/CircularProgress';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './shoppingCart.css';

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


    const ListBuilder = (props: { data: ShoppingCartDTO, idx: number }) => {

        return (
            <Paper elevation={3} className='cartPaper'>
                <img style={{width: '200px', height: '200px'}} src={props.data.g_image}
                     alt={'상품이미지'}/>
                <span className={'cartItem'}>
                    <strong>
                    {props.data.g_status === 0 ? '구매 가능!' : '품절'}
                    </strong>
                    <div>{props.data.g_name}</div>
                    <div>
                        원래 가격 : {props.data.g_price}원
                    </div>
                    <div>
                        할인가 : {props.data.g_discount}원
                    </div>

                </span>

                <span className='cartRight'>
                        <Button id={`${props.data.g_count}`} onClick={e => plus(e, props.idx)}><AddIcon/></Button>
                    <span>수량 : <strong>{props.data.g_count}</strong></span>
                <Button id={`${props.data.g_count}`} onClick={e => minus(e, props.idx)}><RemoveIcon/>
                </Button>

                    <Button variant={'outlined'} name={`${props.idx}`} color="error"
                            onClick={() => {
                                if (!window.confirm('상품을 삭제하시겠습니까?')) return false;
                                removeItem(props.data.g_code, props.idx)
                            }}>
                        삭제
                    </Button>
                </span>
            </Paper>
        )
    }

    return (
        <div className={'cartDivContainer'}>
            <strong>{cartReducer.length === 0 || `${cartReducer[0].o_name}에서 담은 `}장바구니</strong>
            {cartReducer.length ?
                <>
                    <br/>
                    {cartReducer.map((data: ShoppingCartDTO, idx: number) => <ListBuilder data={data} idx={idx}
                                                                                          key={idx}/>)}
                    <br/>
                    <div>
                        총 주문 상품 수 : {cartReducer.length} 개, {' '}
                        {cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0)}원
                    </div>
                    <br/>
                    <div>
                    <Button variant={'contained'} style={{width: '300px'}} onClick={() => {
                        dispatch({type: 'orderIn'});
                        history.push('/user/order');
                    }}>주문하기</Button>
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