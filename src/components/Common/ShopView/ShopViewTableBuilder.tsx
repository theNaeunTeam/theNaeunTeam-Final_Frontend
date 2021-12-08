import React from 'react';
import {Button, Paper} from "@mui/material";
import {shopViewType} from "../../../lib/types";

export default function shopViewTableBuilder(props: { data: shopViewType, idx: number, saveGoods: (e: React.FormEvent<HTMLFormElement>, max: number) => void; }) {

    const optionTagBuilder = (g_count: number): JSX.Element[] => {
        const res = [];
        for (let i = 1; i <= g_count; i++) {
            res.push(<option value={i} key={i}>{i}개</option>);
        }
        return res;
    }

    return (
        <>
            <Paper className={'ShopViewDivContainer'}>
                <div className={'ShopViewDivHalfMenu'}>
                    <div className={'goodsDetail'}>
                        <h4 style={{fontSize: 'larger', color: 'black'}}>{props.data.g_name}</h4>
                        <h5 style={{fontSize: 'large'}}>유통기한 : {props.data.g_expireDate}</h5>
                        <span>
                            <strong style={{
                                textDecorationLine: 'line-through',
                                color: 'gray'
                            }}>정상가 : {props.data.g_price}</strong>
                                <br/>
                            <strong>할인가 : {props.data.g_discount}</strong>
                                </span>
                        <h5>남은 수량 : {props.data.g_count}</h5>

                        <form onSubmit={event => props.saveGoods(event, props.data.g_count)} className={'goodsForm'}>
                            <span style={{fontFamily: '', fontWeight: 'bold'}}>수량 : </span>
                            <select className='cntSelect'>
                                {optionTagBuilder(props.data.g_count).map((data: any) => data)}
                            </select> {' '}
                            <input type={'hidden'} value={props.data.g_code}/>
                            <button style={{background: 'none', border: 'none'}}>
                                <Button style={{fontSize: 'larger', fontWeight: 'bold'}} variant={"outlined"}>장바구니
                                    담기</Button></button>
                        </form>
                    </div>
                </div>
                <div className={'ShopViewDivHalfMenu'}>
                    <div className={'goodsImageDiv'}>
                        <img className={'goodsImage'} src={props.data.g_image} alt={'상품이미지'}/>
                    </div>
                </div>
            </Paper>
        </>
    )
}