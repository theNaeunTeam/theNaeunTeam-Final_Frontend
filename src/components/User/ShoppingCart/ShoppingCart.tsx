import React from "react";
import {cartReducerType, ShoppingCartDTO} from "../../../lib/types";
import {ShoppingCartListBuilder} from "./ShoppingCartListBuilder";
import CircularProgress from "@mui/material/CircularProgress";
import {Button} from "@mui/material";

export default function ShoppingCart(props: { cartReducer: any; minus: any; plus: any; removeItem: any; dispatch: any; history: any; loading: any; }) {

    const {
        cartReducer,
        minus,
        plus,
        removeItem,
        dispatch,
        history,
        loading,
    } = props;


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
                        {cartReducer.reduce((acc: number, cur: cartReducerType) => acc + cur.g_discount * cur.g_count, 0)}원
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