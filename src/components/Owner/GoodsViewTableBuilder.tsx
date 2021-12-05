import {goodsViewType} from "../../lib/types";
import {Button} from "@mui/material";
import React from "react";

export const GoodsViewTableBuilder = (props: { data: goodsViewType, idx: number, modifyGoods: any, deleteGoods: any }) => {

    return (
        <tr>
            <td>
                {props.data.g_name}
            </td>
            <td>
                {props.data.g_category}
            </td>
            <td>
                {props.data.g_price}
            </td>
            <td>
                {props.data.g_discount}
            </td>
            <td>
                {props.data.g_expireDate}
            </td>
            <td> {props.data.g_status === 0 ? '판매중'
                : props.data.g_status === 1 ? '판매완료'
                    : props.data.g_status === 2 ? '판매중지' : null}
            </td>
            <td>
                {props.data.cnt}
            </td>
            <td>
                {props.data.g_count}
            </td>
            <td>
                <Button variant="outlined" name={`${props.data.g_code}`} onClick={e => props.modifyGoods(e)}
                        className='editbtn'>수정</Button>
            </td>
            <td>
                <Button variant="outlined" name={`${props.data.g_code}`} onClick={e => props.deleteGoods(e)}
                        className='editbtn'>판매완료</Button>
            </td>
        </tr>
    )
};