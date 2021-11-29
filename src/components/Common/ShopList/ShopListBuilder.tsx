import {categoryType, shopList} from "../../../modules/types";
import React, {useEffect, useState} from "react";
import {fetch_Category_Per_sNumber} from "../../../lib/api/Fetch_Category_Per_sNumber";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {Doughnut} from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton';

interface listType {
    data: shopList;
    idx: number;
}

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
            <div className='DivBorderd' key={idx}>
                <span className='shopListItems'>
                    {
                        childLoading ?
                            <Skeleton variant="rectangular" width={210} height={118}/>
                            :
                            <Doughnut data={{
                                labels: ['기타', '냉동식품', '조리/반조리', '신선식품', '가공식품', '드링크'],
                                datasets: [
                                    {
                                        label: '상품 리스트',
                                        data: [category.other, category.freeze, category.cooked, category.fresh, category.gagong, category.drink],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}/>}
                </span>

                <span className='shopListItems'>
                <img style={{width: '30%', height: '30%'}} src={data.o_image}/><br/>
                                가게명:{data.o_name}<br/>
                                대표번호:{data.o_phone}<br/>
                                현위치와의 거리 : {Math.round(Number(data.distance) * 100)}미터<br/>
                    {data.o_time1} ~ {data.o_time2}<br/>
                                    <button onClick={() => history.push(`/shopView/${data.o_sNumber}`)}>
                                        이동하기</button>
                                    </span>

                <span className='shopListItems'>
                <Map
                    center={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}
                    style={{width: '100%', height: '100%'}}
                >
                    <MapMarker position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}>
                        <div style={{color: "#000"}}>{data.o_name}</div>
                    </MapMarker>
                </Map>
                </span>
            </div>
        </>
    )
}
