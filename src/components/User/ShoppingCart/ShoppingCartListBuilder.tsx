import React from "react";
import {ShoppingCartDTO} from "../../../lib/types";
import {Button, Paper} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const ShoppingCartListBuilder = (props: { data: ShoppingCartDTO, idx: number, removeItem: any, plus: any, minus: any }) => {

    return (
        <Paper elevation={3} className='cartPaper'>
            <img style={{width: '200px', height: '200px'}} src={props.data.g_image}
                 alt={'상품이미지'}/>
            <span className={'cartItem'}>
                    <strong style={{fontSize: 'x-large', fontWeight: 'bolder'}}>
                    {props.data.g_status === 0 ? '구매 가능!' : '품절'}
                    </strong>
                    <div style={{}}>{props.data.g_name}</div>
                    <div style={{}}>
                        원래 가격 : {props.data.g_price}원
                    </div>
                    <div>
                        할인가 : {props.data.g_discount}원
                    </div>

                </span>

            <span className='cartRight'>
                        <Button id={`${props.data.g_count}`} onClick={e => props.plus(e, props.idx)}><AddIcon/></Button>
                    <span style={{fontWeight: 'bold'}}>수량 : <strong>{props.data.g_count}</strong></span>
                <Button id={`${props.data.g_count}`} onClick={e => props.minus(e, props.idx)}><RemoveIcon/>
                </Button>

                    <Button style={{fontWeight: 'bold', fontSize: 'medium'}} variant={'outlined'} name={`${props.idx}`}
                            color="error"
                            onClick={() => {
                                // if (!window.confirm('상품을 삭제하시겠습니까?')) return false;
                                props.removeItem(props.data.g_code, props.idx);
                            }}>
                        삭제
                    </Button>
                </span>
        </Paper>
    )
}