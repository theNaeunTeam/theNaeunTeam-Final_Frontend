import React, {useEffect, useState} from 'react';
import {client} from "../../../lib/api/client";
import {shopList} from "../../../modules/types";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import ShopListBuilder from "./ShopListBuilder";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './shopList.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import {useInView} from "react-intersection-observer"
import {GrMapLocation} from "react-icons/gr";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

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
  margin-top: 50px;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 10px;
`;

const DivHalfMenu = styled.div`
  margin: -1px -5px 50px;
  padding: 20px 200px;
  text-align: center;
  width: 80.1%;
  border: solid #d2e5bf;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

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
    const [ref, inView] = useInView();
    const history = useHistory();
    const dispatch = useDispatch();

    const [list, setList] = useState<shopList[]>([]);
    const [range, setRange] = useState('1');
    const [lat, setLat] = useState(seoulLAT);
    const [lon, setLon] = useState(seoulLON);
    const [loading, setLoading] = useState(true);
    const [marker, setMarker] = useState<boolean[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [noMoreData, setNoMoreData] = useState(false);
    let [goodsName, setGoodsName] = useState('');
    let [sortOption, setSortOption] = useState('가까운순');
    const [aaaa, setAaaa] = useState(false);


    const {userLocalMap} = useSelector((state: RootState) => state);

    useEffect(() => {
        userLocalMap.lat != 0 && userLocalMap.lon != 0
            ? init(userLocalMap.lat, userLocalMap.lon)
            : init();

    }, [startIndex]);

    useEffect(() => {
        if (inView && !loading && !noMoreData) {
            setLoading(true);
            setStartIndex(startIndex + 10);
        }
    }, [inView]);

    const init = (LAT = lat, LON = lon) => {

        if (goodsName !== '') {
            sortOption = '상품많은순'
        }

        client.get(`/common/list?LAT=${LAT}&LON=${LON}&RAD=${range}&startIndex=${startIndex}&goodsName=${goodsName}&sortOption=${sortOption}`)
            .then(res => {
                if (res.data.length < 10) {
                    setNoMoreData(true);
                } else {
                    setNoMoreData(false);
                }

                console.log(res.data);

                if (startIndex === 0) {
                    if (goodsName !== '') {
                        const massage = res.data.filter((data: shopList) => data.searchResult !== 0);
                        console.log('massage', massage);
                        console.log('massage.length', massage.length);
                        if (massage.length < 10) {
                            setNoMoreData(true);
                        } else {
                            setNoMoreData(false);
                        }
                        setList(massage);
                    } else {
                        setList([...res.data]);
                    }

                } else {
                    if (goodsName !== '') {

                        const massage = res.data.filter((data: shopList) => data.searchResult !== 0);
                        console.log('massage', massage);
                        console.log('massage.length', massage.length);

                        if (massage.length < 10) {
                            setNoMoreData(true);
                        } else {
                            setNoMoreData(false);
                        }
                        setList([...list, ...massage]);
                    } else {
                        setList([...list, ...res.data]);
                    }
                }
                setLat(Number(LAT));
                setLon(Number(LON));

                if (res.data.length === 0) {
                    setNoMoreData(true);
                } else {
                    setNoMoreData(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                setAaaa(!aaaa);
            });
    }

    function getLoc() {
        setLoading(true);
        setStartIndex(0);
        // 위치 허용 팝업
        navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);

        function onGeoOK(position: any) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            init(lat, lon);

            dispatch({type: 'getLocaled', payload: {lat: lat, lon: lon}});
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
                <h3 style={{
                    background: '#f6f7f3',
                    // backgroundColor: 'rgba( 47, 138, 241, 0.1 )',
                    color: 'black',
                    fontWeight: 'bold',
                    padding: '20px 36.8% ',
                    margin: '1px',
                    borderTopRightRadius: '15px',
                    borderTopLeftRadius: '15px',
                }}>주변 검색 <GrMapLocation/>
                </h3>

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
                        <Slider style={{margin: '30px 0px 50px'}}
                                min={0.1}
                                max={2}
                                defaultValue={1}
                                step={0.1}
                                marks={marks}
                                valueLabelDisplay="auto"
                                onChange={e => setRange((e.target as HTMLInputElement).value)}
                        />

                        <button className='shopMapBtn' style={{width: '75%', margin: '15px'}} color="error"
                                onClick={getLoc}>{`주변 ${range}km 내 찾기`}</button>

                        <div>
                            <TextField
                                label="상품명으로 검색"
                                defaultValue=''
                                value={goodsName}
                                onChange={e => setGoodsName(e.target.value)}
                            />
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel id="demo-simple-select-helper-label">정렬</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    value={sortOption}
                                    label="정렬"
                                    onChange={e => {
                                        setSortOption(e.target.value);
                                    }}
                                >
                                    <MenuItem value={'가까운순'}>가까운순</MenuItem>
                                    <MenuItem value={'멀리있는순'}>멀리있는순</MenuItem>
                                    <MenuItem value={'상품많은순'}>상품많은순</MenuItem>
                                    <MenuItem value={'상품적은순'}>상품적은순</MenuItem>
                                </Select>
                                <FormHelperText>거리,상품 갯수로 정렬할 수 있습니다</FormHelperText>
                            </FormControl>
                        </div>
                    </Box>

                </DivHalfMenu>
                {
                    aaaa ? list.map((data, idx) => <ShopListBuilder data={data} idx={idx} key={`slb${idx}`}/>)
                        : list.map((data, idx) => <ShopListBuilder data={data} idx={idx} key={`slb${idx}`}/>)
                }
            </DivContainer>
            {list.length !== 0 &&
                <div ref={noMoreData ? undefined : ref}>
                    {noMoreData && <h1>리스트의 마지막입니다.</h1>}
                </div>
            }
        </>
    )
}
