import React, {useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components'


export default function OwnerMain() {

    const initialValue = {
        title: '씨유 센텀시티점',
        total: '200000원',
        daily: '200원',
        monthly: '2000원',
        goods: '360개',
        reserved: '15개',
        lat: 33.5563,
        lng: 126.79581,
    }

    const [ownerMain, setOwnerMain] = useState(initialValue);

    const Container = styled.div`
      border: solid black;
      display: flex;
      justify-content: center;
      margin: 50px;
      padding: 10px;
    `

    const HalfMenu = styled.div`
      flex: 1;
      margin: 10px;
      padding: 10px;
    `

    function getLoc() {
        navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);

        function onGeoOK(position: any) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            console.log(`${lat} ${lng}`);
            setOwnerMain({...ownerMain, lat: lat, lng: lng, title: `lat=${lat} lon=${lng}`})
        }

        function onGeoError(e: any) {
            alert("위치를 찾을 수 없습니다");
            console.log(e);
        }
    }

    return (
        <Container>
            <HalfMenu>
                <h3>{ownerMain.title}</h3>
                <br/>
                <h5>총 판매 금액 : {ownerMain.total}</h5>
                <h5>일일 판매 금액 : {ownerMain.daily}</h5>
                <h5>월별 판매 금액 : {ownerMain.monthly}</h5>
                <h5>등록한 상품 : {ownerMain.goods}</h5>
                <h5>예약 진행중 : {ownerMain.reserved}</h5>
                <button onClick={() => {
                    getLoc()
                }}>위도경도변경테스트
                </button>
            </HalfMenu>
            <HalfMenu>
                <Map
                    center={{lat: ownerMain.lat, lng: ownerMain.lng}}
                    style={{width: "100%", height: "360px"}}
                >
                    <MapMarker position={{lat: ownerMain.lat, lng: ownerMain.lng}}>
                        <div style={{color: "#000"}}>{ownerMain.title}</div>
                    </MapMarker>
                </Map>
            </HalfMenu>

        </Container>
    )
}
