import React, {useEffect, useState} from 'react';
import {client} from "../../../lib/api/client";
import {shopList} from "../../../modules/types";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Button} from "@mui/material";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import ShopListBuilder from "./ShopListBuilder";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const marks = [
    {
        value: 1,
        label: '1000m',
    },
    {
        value: 2,
        label: '2000m',
    },
    {
        value: 3,
        label: '3000m',
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
    const [range, setRange] = useState('2');
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
        navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);

        function onGeoOK(position: any) {
            setLoading(true);
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
                            max={3}
                            defaultValue={2}
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
