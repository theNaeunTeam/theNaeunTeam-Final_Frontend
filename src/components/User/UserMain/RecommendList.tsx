import React from "react";
import {recommendType} from "../../../modules/types";

interface recommendProps {
    history: any,
    data: recommendType,
    idx: number
}

export default function RecommendList(props: recommendProps) {

    return (
        <>
            <span>
                    <div style={{height: '100%', width: '100%'}}>
                        {props.data.o_name}
                        <br/>
                        <img src={props.data.g_image}
                             onClick={() => props.history.push(`/shopView/${props.data.g_owner}`)}
                             style={{height: '70%', width: '70%' , cursor:'pointer'}}
                        />
                        <br/>
                        {props.data.g_name}
                        <br/>
                        원가 : {props.data.g_price}
                        <br/>
                        할인가 : {props.data.g_discount}
                    </div>
            </span>
        </>
    )
}