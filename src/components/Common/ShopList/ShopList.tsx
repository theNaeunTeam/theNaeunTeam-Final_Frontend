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
import './shopList.scss';

const marks = [
    {
        value: 0.1,
        label: '100m',
    },
    {
      value: 0.5,
      label: '500m'
    },
    {
        value: 1,
        label: '1000m',
    },
    {
        value: 1.5,
        label: '1500m',
    },
    {
        value: 2,
        label: '2000m',
    },
];

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 10px;
`;

const DivHalfMenu = styled.div`
  margin: 25px;
  padding: 10px;
  text-align: center;
  width: 70%;
`;

const DivMarker = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
`

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
    const [marker, setMarker] = useState<boolean[]>([])


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
                    style={{width: "80%", height: "500px"}}
                    level={5}
                >
                    <MarkerClusterer
                        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                        minLevel={4} // 클러스터 할 최소 지도 레벨
                    >
                        {list.map((data, idx) => {
                                marker.push(false);
                                return (
                                    <MapMarker key={`MapMarker${idx}`}
                                               position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}
                                               onClick={() => {
                                                   const cp = [...marker];
                                                   cp[idx] = true;
                                                   setMarker(cp);
                                               }}
                                    >

                                        {marker[idx] && <DivMarker key={`DivMarker${idx}`}
                                                                   onClick={() => history.push(`/shopView/${data.o_sNumber}`)}
                                                                   onMouseLeave={() => {
                                                                       const cp = [...marker];
                                                                       cp[idx] = false;
                                                                       setMarker(cp);
                                                                   }}
                                                                   style={{cursor: "help",}}>
                                            {data.o_name}
                                        </DivMarker>
                                        }
                                    </MapMarker>
                                )
                            }
                        )}
                    </MarkerClusterer>

                </Map>
                <DivHalfMenu>
                    <Box className='box'>
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
                        <Button style={{width:'100%'}} color="error" onClick={getLoc} variant={'outlined'}>{`주변 ${range}km 내 찾기`}</Button>
                    </Box>
                </DivHalfMenu>
                {
                    list.map((data, idx) => <ShopListBuilder data={data} idx={idx} key={`slb${idx}`}/>)
                }
            </DivContainer>
        </>
    )
}
