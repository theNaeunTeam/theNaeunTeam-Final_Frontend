import React, {useEffect, useState} from 'react';
import {client} from "../../../lib/api/client";
import {shopList} from "../../../modules/types";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Button} from "@mui/material";
import {Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import ShopListBuilder from "./ShopListBuilder";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const marks = [
    {
        value: 0.1,
        label: '100m',
    },
    {
        value: 1,
        label: '1000m',
    },
    {
        value: 2,
        label: '2000m',
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
    const [range, setRange] = useState('1');
    const [lat, setLat] = useState(seoulLAT);
    const [lon, setLon] = useState(seoulLON);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    function getLoc() {
        setLoading(true);

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


    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DivContainer>
                <Map
                    center={{lat: lat, lng: lon}}
                    style={{width: "100%", height: "500px"}}
                    level={5}
                >
                    <MarkerClusterer
                        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                        minLevel={3} // 클러스터 할 최소 지도 레벨
                    >
                    {list.map((data, idx) =>
                        <MapMarker key={`MapMarker${idx}`}
                                   position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}>
                            <DivMarker key={`DivMarker${idx}`}
                                       onClick={() => history.push(`/shopView/${data.o_sNumber}`)}>
                                <img
                                    alt="close"
                                    width="14"
                                    height="13"
                                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                                    style={{
                                        position: "absolute",
                                        right: "5px",
                                        top: "5px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => (false)}
                                />
                                {data.o_name}
                                clickable={true}
                            </DivMarker>
                        </MapMarker>
                    )}
                    </MarkerClusterer>

                </Map>
                <DivHalfMenu>
                    <Box sx={{m: 3, width: 300}}>
                        <Slider
                            min={0.1}
                            max={2}
                            defaultValue={1}
                            step={0.1}
                            marks={marks}
                            valueLabelDisplay="auto"
                            // @ts-ignore
                            onChange={e => setRange(e.target.value)}
                        />
                        <Button onClick={getLoc} variant={'contained'}>내 주변 {range} km 이내의 가게 찾기</Button>
                    </Box>
                </DivHalfMenu>
                {
                    list.map((data, idx) => <ShopListBuilder data={data} idx={idx} key={`slb${idx}`}/>)
                }
            </DivContainer>
        </>
    )
}
