import React, {useEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {shopList} from "../../modules/types";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Button} from "@mui/material";
import {Map, MapMarker} from "react-kakao-maps-sdk";

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

const seoulLAT = 37.5540501787837;
const seoulLON = 126.972330875495;

const centumLAT = 35.1730461532695;
const centumLON = 129.127655001351;

export default function ShopList() {

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


    return (
        <div>
            <Map
                center={{lat: lat, lng: lon}}
                style={{width: "80%", height: "500px"}}
                level={5}
            >
                {list.map((data, idx) =>
                    <MapMarker position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}>
                        <div style={{color: "#000"}} key={idx}>
                            {data.o_name}
                        </div>
                    </MapMarker>
                )}
            </Map>
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

        </div>
    )
}
