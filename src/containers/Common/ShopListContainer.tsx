import React, {useEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {shopList} from "../../lib/types";
import {useHistory} from "react-router-dom";
import '../../lib/styles/shopList.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useInView} from "react-intersection-observer"
import ShopList from "../../components/Common/ShopList/ShopList";
import {useSweetAlert} from "../../lib/useSweetAlert";


const marks = [
    {
        value: 0.2,
        label: '200m',
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
        value: 1.9,
        label: '1900m',
    },
];

const seoulLAT = 37.5540501787837;
const seoulLON = 126.972330875495;

const centumLAT = 35.1730461532695;
const centumLON = 129.127655001351;

export default function ShopListContainer() {
    const [inViewRef, inView] = useInView();
    const history = useHistory();
    const dispatch = useDispatch();
    const {fireSweetAlert} = useSweetAlert();

    const [list, setList] = useState<shopList[]>([]);
    const [range, setRange] = useState('1');
    const [lat, setLat] = useState(seoulLAT);
    const [lon, setLon] = useState(seoulLON);
    const [loading, setLoading] = useState(true);
    const [marker, setMarker] = useState<boolean[]>([]);
    const [startIndex, setStartIndex] = useState(-1);
    const [noMoreData, setNoMoreData] = useState(false);
    let [goodsName, setGoodsName] = useState('');
    let [sortOption, setSortOption] = useState('가까운순');
    const [showList, setShowList] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [displayRange, setDisplayRange] = useState('');

    const {userLocalMap} = useSelector((state: RootState) => state);

    useEffect(() => {
        if (userLocalMap.lat) setStartIndex(0);
    }, []);

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

                if (startIndex === 0) { // 페이지 로드되고 첫페이지다
                    if (goodsName !== '') { // 검색창에 뭔가 있으면
                        const massage = res.data.filter((data: shopList) => data.searchResult !== 0); // 필터로 그것만 꺼냄
                        if (massage.length < 10) {
                            setNoMoreData(true);
                        } else {
                            setNoMoreData(false);
                        }
                        setList(massage);
                        setDisplayName(goodsName);
                        if (massage.length === 0) fireSweetAlert({title: '검색결과가 없습니다', icon: 'info'});
                    } else { // 검색창이 비어있으면 그대로 스테이트에 저장
                        setList(res.data);
                        setDisplayName('');
                    }

                } else { // 다음페이지 넘어갈때
                    if (goodsName !== '') { // 검색창에 뭔가 있으면

                        const massage = res.data.filter((data: shopList) => data.searchResult !== 0); // 필터로 그것만 꺼냄

                        if (massage.length < 10) {
                            setNoMoreData(true);
                        } else {
                            setNoMoreData(false);
                        }
                        // setList([...list, ...massage]);
                        const cp = [...list];
                        massage.forEach((data: shopList) => cp.push(data));
                        setList(cp);
                        setDisplayName(goodsName);
                        if (massage.length === 0) fireSweetAlert({title: '검색결과가 없습니다', icon: 'info'});
                    } else {
                        // setList([...list, ...res.data]);
                        const cp = [...list];
                        res.data.forEach((data: shopList) => cp.push(data));
                        setList(cp);
                        setDisplayName('');
                    }
                }
                setLat(Number(LAT));
                setLon(Number(LON));
                setDisplayRange(range);
            })
            .catch(err => {
            })
            .finally(() => {
                setLoading(false);
                setShowList(true);
            });
    }

    function getLoc() {
        setShowList(!showList);
        setLoading(true);
        setShowList(false);
        // 위치 허용 팝업
        navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);

        function onGeoOK(position: any) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLat(lat);
            setLon(lon);

            if (startIndex !== 0) {
                setStartIndex(0);
            } else {
                init(lat, lon);
            }

            dispatch({type: 'getLocaled', payload: {lat: lat, lon: lon}});
        }

        function onGeoError(e: any) {
            alert("위치를 찾을 수 없습니다");
            setLoading(false);
        }

    }

    return (
        <>
            <ShopList
                loading={loading}
                lat={lat}
                lon={lon}
                list={list}
                marker={marker}
                setMarker={setMarker}
                history={history}
                marks={marks}
                setRange={setRange}
                goodsName={goodsName}
                setGoodsName={setGoodsName}
                sortOption={sortOption}
                setSortOption={setSortOption}
                getLoc={getLoc}
                range={range}
                displayRange={displayRange}
                displayName={displayName}
                showList={showList}
                noMoreData={noMoreData}
                inViewRef={inViewRef}
            />
        </>
    )
}
