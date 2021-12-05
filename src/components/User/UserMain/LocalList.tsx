import React from "react";
import {shopList} from "../../../lib/types";

interface localProps {
    history: any,
    data: shopList,
    idx: number
}

export default function LocalList(props: localProps) {
    return (
        <>
            <div className='goodsSide'>
                <img src={props.data.o_image}
                     onClick={() => props.history.push(`/shopView/${props.data.o_sNumber}`)}
                     className={'localListImg'}
                />
                <br/>
                <b>{props.data.o_name}</b><br/><br/>

                <span className={'localListDetail'}>{props.data.o_address}</span><br/>
                <span className={'localListDetail'}>{props.data.o_time1}~{props.data.o_time2}</span>
                <br/>
            </div>
        </>
    )
}