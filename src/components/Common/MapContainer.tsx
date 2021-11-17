import React from 'react';

// @ts-ignore
const {kakao} = window;

const MapContainer = () => {

    const test = {
        "postcode": "",
        "postcode1": "",
        "postcode2": "",
        "postcodeSeq": "",
        "zonecode": "48057",
        "address": "부산 해운대구 해운대로 265",
        "addressEnglish": "265, Haeun-daero, Haeundae-gu, Busan, Korea",
        "addressType": "R",
        "bcode": "2635010400",
        "bname": "재송동",
        "bnameEnglish": "Jaesong-dong",
        "bname1": "",
        "bname1English": "",
        "bname2": "재송동",
        "bname2English": "Jaesong-dong",
        "sido": "부산",
        "sidoEnglish": "Busan",
        "sigungu": "해운대구",
        "sigunguEnglish": "Haeundae-gu",
        "sigunguCode": "26350",
        "userLanguageType": "K",
        "query": "해운대로 265",
        "buildingName": "센텀 천일스카이원",
        "buildingCode": "2635010400200740005000001",
        "apartment": "Y",
        "jibunAddress": "부산 해운대구 재송동 1360",
        "jibunAddressEnglish": "1360, Jaesong-dong, Haeundae-gu, Busan, Korea",
        "roadAddress": "부산 해운대구 해운대로 265",
        "roadAddressEnglish": "265, Haeun-daero, Haeundae-gu, Busan, Korea",
        "autoRoadAddress": "",
        "autoRoadAddressEnglish": "",
        "autoJibunAddress": "",
        "autoJibunAddressEnglish": "",
        "userSelectedType": "R",
        "noSelected": "N",
        "hname": "",
        "roadnameCode": "2006010",
        "roadname": "해운대로",
        "roadnameEnglish": "Haeun-daero"
    }


    // useEffect(() => {
    //     const container = document.getElementById('myMap');
    //     const options = {
    //         center: new kakao.maps.LatLng(33.450701, 126.570667),
    //         level: 3
    //     };
    //     const map = new kakao.maps.Map(container, options);
    // }, []);
    //
    // return (
    //     <div id='myMap' style={{
    //         width: '500px',
    //         height: '500px'
    //     }}/>
    // );
}

export default MapContainer;
