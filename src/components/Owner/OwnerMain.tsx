import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {ownerMainType} from "../../modules/types";


export default function OwnerMain() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!authReducer.isOwner) history.push('/err');
    }, []);

    const initialValue = {
        o_name: '',
        total: 0,
        goods: 0,
        reserve: 0,
        o_latitude: 0,
        o_longitude: 0,

    };


    const [ownerMain, setOwnerMain] = useState<ownerMainType>(initialValue);

    const DivContainer = styled.div`
      border: solid black;
      display: flex;
      justify-content: center;
      margin: 50px;
      padding: 10px;
    `;

    const DivHalfMenu = styled.div`
      flex: 1;
      margin: 10px;
      padding: 10px;
    `;

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URL = '';
        try {
            const res = await client.get(URL);
            console.log(res);
            setOwnerMain(res.data);

        } catch (e) {
            console.log(e);
        }
    };

    function getLoc() {
        navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);

        function onGeoOK(position: any) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            console.log(`${lat} ${lng}`);
            setOwnerMain({...ownerMain, o_latitude: lat, o_longitude: lng, o_name: `lat=${lat} lon=${lng}`})
        }

        function onGeoError(e: any) {
            alert("위치를 찾을 수 없습니다");
            console.log(e);
        }
    }

    return (
        <DivContainer>
            <DivHalfMenu>
                <h3>{ownerMain.o_name}</h3>
                <br/>
                <h5>총 판매 금액 : {ownerMain.total} 원</h5>
                {/*<h5>일일 판매 금액 : {ownerMain.daily}</h5>*/}
                {/*<h5>월별 판매 금액 : {ownerMain.monthly}</h5>*/}
                <h5>등록한 상품 : {ownerMain.goods} 개</h5>
                <h5>예약 진행중 : {ownerMain.reserve} 건</h5>
                {/*<button onClick={() => {*/}
                {/*    getLoc();*/}
                {/*}}>위도경도변경테스트*/}
                {/*</button>*/}
            </DivHalfMenu>
            <DivHalfMenu>
                <Map
                    center={{lat: ownerMain.o_latitude, lng: ownerMain.o_longitude}}
                    style={{width: "100%", height: "360px"}}
                >
                    <MapMarker position={{lat: ownerMain.o_latitude, lng: ownerMain.o_longitude}}>
                        <div style={{color: "#000"}}>{ownerMain.o_name}</div>
                    </MapMarker>
                </Map>
            </DivHalfMenu>

        </DivContainer>
    )
}
