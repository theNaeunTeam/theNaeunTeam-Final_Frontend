import React, {useEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {categoryType, shopList} from "../../modules/types";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Button} from "@mui/material";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {fetch_Category_Per_sNumber} from "../../lib/api/Fetch_Category_Per_sNumber";

const marks = [
    {
        value: 1,
        label: '1km',
    },
    {
        value: 3,
        label: '3km',
    },
    {
        value: 5,
        label: '5km',
    },
    {
        value: 7,
        label: '7km',
    },
    {
        value: 10,
        label: '10km',
    },
];

const DivContainer = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  padding: 10px;
`;

const DivHalfMenu = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
`;
const DivBorderd = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid lightgray 10px;
  padding: 10px;
`;
const DivMarker = styled.div`

`
// 가운데 정렬 안먹음 ㅡㅡ

const seoulLAT = 37.5540501787837;
const seoulLON = 126.972330875495;

const centumLAT = 35.1730461532695;
const centumLON = 129.127655001351;

export default function ShopList() {

    const history = useHistory();

    const [list, setList] = useState<shopList[]>([]);
    const [range, setRange] = useState('5');
    const [lat, setLat] = useState(seoulLAT);
    const [lon, setLon] = useState(seoulLON);

    useEffect(() => {
        init();
    }, []);

    const init = (LAT = lat, LON = lon) => {
        client.get(`/common/list?LAT=${LAT}&LON=${LON}&RAD=${range}`)
            .then(res => {
                console.log(res);
                setList(res.data);
                setLat(Number(LAT));
                setLon(Number(LON));
            })
            .catch(err => {
                console.log(err);
            })
    }

    function getLoc() {
        navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);

        function onGeoOK(position: any) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            init(lat, lon);
        }

        function onGeoError(e: any) {
            alert("위치를 찾을 수 없습니다");
            console.log(e);
        }
    }

    interface listType {
        data: shopList;
        idx: number;
    }

    const ListBuilder = ({data, idx}: listType) => {

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

    return (
        <>
            <DivContainer>
                <Map
                    center={{lat: lat, lng: lon}}
                    style={{width: "100%", height: "500px"}}
                    level={5}
                >
                    {list.map((data, idx) =>
                        <MapMarker position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}>
                            <DivMarker key={idx} onClick={() => history.push(`/shopView/${data.o_sNumber}`)}>
                                {data.o_name}
                            </DivMarker>
                        </MapMarker>
                    )}
                </Map>
                <DivHalfMenu>
                    <Box sx={{m: 3, width: 300}}>
                        <Slider
                            min={1}
                            max={10}
                            defaultValue={5}
                            step={1}
                            marks={marks}
                            valueLabelDisplay="auto"
                            // @ts-ignore
                            onChange={e => setRange(e.target.value)}
                        />
                        <Button onClick={getLoc} variant={'contained'}>내 주변 {range} km 이내의 가게 찾기</Button>
                    </Box>
                </DivHalfMenu>
                {
                    list.map((data, idx) => <ListBuilder data={data} idx={idx}/>)
                }
            </DivContainer>
        </>
    )
}
