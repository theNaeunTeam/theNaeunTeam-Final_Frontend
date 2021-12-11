import {categoryType, shopList} from "../../../lib/types";
import React, {useEffect, useState} from "react";
import {fetch_Category_Per_sNumber} from "../../../lib/api/Fetch_Category_Per_sNumber";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {useHistory} from "react-router-dom";
import {Doughnut} from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton';
import {Paper} from "@mui/material";

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
        setChildLoading(true);
        fetch_Category_Per_sNumber(data.o_sNumber)
            .then(res => {
                setCategory(res);
                setChildLoading(false);
            })
            .catch(err => {
            })
    }, []);

    return (
        <>
            <Paper className='DivBordered' key={idx} elevation={3}>
                <span className='shopListItems'>
                <Map
                    center={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}
                    style={{width: '100%', height: '100%', borderRadius: '10px'}}
                >
                    <MapMarker position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}>
                    </MapMarker>
                </Map>
                </span>

                <span className='shopListItems2'>

                <img style={{height: '100px', maxWidth: '200px'}} src={data.o_image} alt={'가게대표이미지'}/><br/>
                    <strong>{data.o_name}<br/></strong>
                                        <div className={'noDoughnut'}>
                        판매중인 상품:{category.other + category.freeze + category.freeze + category.cooked + category.fresh + category.gagong + category.drink}개
                    </div>
                    <div style={{fontSize: '14px', textAlign: 'center'}}>
                        {data.o_address}
                        <div>{data.o_phone}</div>
                    </div>
                    <div className={'shopListContents'}>
                    <span>{data.o_time1}~{data.o_time2}</span>
                        <span>...{Math.round(Number(data.distance) * 1000)}m</span>
                    </div>
                                    <button className='shopListBtn' style={{width: '60%', padding: '10px'}}
                                            onClick={() => history.push(`/shopView/${data.o_sNumber}`)}>
                                        <strong>상세보기</strong></button>
                    </span>
                <span className='doughnut'>
                    {
                        childLoading ?
                            <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
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
            </Paper>
        </>
    )
}
