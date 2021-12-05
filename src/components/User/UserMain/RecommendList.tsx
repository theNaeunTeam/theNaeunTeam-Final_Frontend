import React from "react";
import {recommendType} from "../../../lib/types";

interface recommendProps {
    history: any,
    data: recommendType,
    idx: number
}

export default function RecommendList(props: recommendProps) {

    return (
        <>
            <div className='goodsSide1'>
                <b style={{fontSize: 'x-large'}}>{props.data.o_name}</b><br/><br/>
                <img src={props.data.g_image}
                     onClick={() => props.history.push(`/shopView/${props.data.g_owner}`)}
                     className={'localListImg'}
                />
                <br/>
                {props.data.g_name}
                <br/><br/>
                원가 : {props.data.g_price}
                <br/>
                할인가 : {props.data.g_discount}
                <br/><br/>
            </div>
        </>
    )
}