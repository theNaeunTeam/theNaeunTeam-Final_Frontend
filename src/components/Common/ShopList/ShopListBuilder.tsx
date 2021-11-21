import {categoryType, shopList} from "../../../modules/types";
import React, {useEffect, useState} from "react";
import {fetch_Category_Per_sNumber} from "../../../lib/api/Fetch_Category_Per_sNumber";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

interface listType {
    data: shopList;
    idx: number;
}

const DivBorderd = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid lightgray 10px;
  padding: 10px;
`;
export default function ShopListBuilder({data, idx}: listType) {

    const history = useHistory();

    const [childLoading, setChildLoading] = useState(true);

    const [category, setCategory] = useState<categoryType>({
        gagong: 0,
        other: 0,
        freeze: 0,
        cooked: 0,
        fresh: 0,
        drink: 0,
        g_owner: '',
    });

    useEffect(() => {
        fetch_Category_Per_sNumber(data.o_sNumber)
            .then(res => {
                setCategory(res);
                setChildLoading(false);
            })
            .catch(err => {
                console.log(idx, '번 통계 ', err);
            })
    }, []);

    return (
        <>
            <DivBorderd key={idx}>
                                <span>
                                가게명:{data.o_name}<br/>
                                대표번호:{data.o_phone}<br/>
                                현위치와의 거리 : {Number(data.distance) * 100}미터<br/>
                                    {data.o_time1} ~ {data.o_time2}<br/>
                                    <button onClick={() => history.push(`/shopView/${data.o_sNumber}`)}>
                                        이동하기</button>
                                    </span>
                <span>
                        {category.g_owner}
                    </span>
                <img style={{width: '300px', height: '300px'}} src={data.o_image}/><br/>


                <Map
                    center={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}
                    style={{width: "300px", height: "360px"}}
                >
                    <MapMarker position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}>
                        <div style={{color: "#000"}}>{data.o_name}</div>
                    </MapMarker>
                </Map>
            </DivBorderd>
        </>
    )
}
