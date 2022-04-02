import {Button} from "@mui/material";
import React from "react";
import {dummyType} from "../../../lib/types";


export const UserReserveTableBuilder = (props: { data: dummyType, idx: number, changeReserveStatus: any }) => {

    return (
        <tr className={'tbl'}>
            <td>
                {props.data.g_name}
            </td>
            <td>
                {props.data.g_category}
            </td>
            <td>
                {props.data.g_expireDate}
            </td>
            <td>
                {props.data.g_count}
            </td>
            <td>
                {props.data.g_status === 0 ? '판매중'
                    : props.data.g_status === 1 ? '판매 완료'
                        : props.data.g_status === 2 ? '판매 중지' : null}
            </td>

            <td>
                {props.data.r_count}
            </td>
            <td>
                {props.data.r_customOrder}
            </td>
            <td>
                {props.data.r_firstDate} / {props.data.r_firstTime}
            </td>
            <td>
                {props.data.r_pay}
            </td>
            <td>
                {props.data.r_status === 0 ? '승인대기'
                    : props.data.r_status === 1 ? '승인완료'
                        : props.data.r_status === 2 ? '거절됨'
                            : props.data.r_status === 3 ? '구매완료'
                                : props.data.r_status === 4 ? '노쇼'
                                    : props.data.r_status === 5 ? '취소됨'
                                        : null
                }
            </td>
            <td>

                <Button
                    // name={props.data.r_code}
                    name={props.data.r_code.toString()}
                    variant="outlined"
                    sx={{m: 1}}
                    onClick={e => props.changeReserveStatus(e)}
                >취소</Button>
            </td>

        </tr>
    )
};
