import {reservationViewType} from "../../lib/types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "@mui/material";
import React from "react";

export const ReservationTableBuilder = (props: {
    data: reservationViewType, idx: number,
    list: reservationViewType[], setList: React.Dispatch<React.SetStateAction<reservationViewType[]>>,
    changeGoodsStatus: (input: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => Promise<void>
}) => {

    return (
        <tr>
            {/*<td>*/}
            {/*    {props.idx + 1}*/}
            {/*</td>*/}
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
                {props.data.g_status === 0 ? '판매중'
                    : props.data.g_status === 1 ? '판매 완료'
                        : props.data.g_status === 2 ? '판매 중지' : null}
            </td>
            <td>
                {props.data.r_u_id}
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
                {props.data.r_status === 0 ? '예약 승인 대기중'
                    : props.data.r_status === 1 ? '승인 완료'
                        : props.data.r_status === 2 ? '거절됨'
                            : props.data.r_status === 3 ? '판매완료'
                                : props.data.r_status === 4 ? '노쇼'
                                    : props.data.r_status === 5 ? '취소됨'
                                        : null
                }
            </td>
            <td>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        defaultValue={props.data.r_status}
                        value={props.data.selectedStatus}
                        onChange={e => {
                            const cp = [...props.list];
                            cp[props.idx].selectedStatus = Number(e.target.value);
                            props.setList(cp);
                        }}
                    >
                        <MenuItem value={1}>승인</MenuItem>
                        <MenuItem value={2}>거절</MenuItem>
                        <MenuItem value={4}>노쇼</MenuItem>
                        <MenuItem value={3}>판매완료</MenuItem>
                    </Select>
                </FormControl>
                <Button sx={{mr: 1, mt: 2}} data-testid='my-test-id' name={props.data.r_code.toString()} variant="outlined"
                        onClick={e => props.changeGoodsStatus(e, props.idx)}>확인</Button>
            </td>

        </tr>
    )
};
