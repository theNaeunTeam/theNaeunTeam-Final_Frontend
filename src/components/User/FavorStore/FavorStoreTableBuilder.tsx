import fullStar from "../../../lib/images/star1.png";
import React from "react";
import {favorListType} from "../../../lib/types";

export const FavorStoreTableBuilder = (props: { data: favorListType, idx: number, favorOff: any }) => {
    return (
        <tr>
            <td>
                {props.data.o_name}
            </td>
            <td>
                {props.data.o_address}
            </td>
            <td>
                {props.data.o_phone}
            </td>
            <td>
                {props.data.o_time1} ~ {props.data.o_time2}
            </td>
            <td>
                {props.data.o_approval === 1 ? '영업중'
                    : props.data.o_approval === 3 ? '서비스 이용 중단'
                        : null
                }
            </td>
            <td>
                <span style={{marginLeft: "auto"}}><img style={{width: "40px"}} src={fullStar}
                                                        title={props.data.f_o_sNumber}
                                                        onClick={e => props.favorOff(e)}/></span>
            </td>

        </tr>
    )
};
