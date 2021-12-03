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
                    <div className='goodsSide'>
                        <b>{props.data.o_name}</b><br/>
                        <img src={props.data.g_image}
                             onClick={() => props.history.push(`/shopView/${props.data.g_owner}`)}
                             style={{height: '300px', width: '467px', cursor: 'pointer'}}
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