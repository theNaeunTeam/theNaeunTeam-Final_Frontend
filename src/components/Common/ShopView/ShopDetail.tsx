import React from 'react';
import {Paper} from "@mui/material";
import {GrMapLocation} from "react-icons/gr";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {CopyToClipboard} from "react-copy-to-clipboard";
import styled from "styled-components";
import {aboutStoreType} from "../../../lib/types";

const DivHalfMenu2 = styled.div`
  flex: 1;
  margin: 20px 20px 60px;
  padding: 0px 0px 100px;
  width: 500px;
`;

const DivMarker = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
`

export default function ShopDetail(props: { aboutStore: aboutStoreType; fireSweetAlert: any }) {


    const {
        fireSweetAlert,
        aboutStore,
    } = props;

    return (
        <>
            <Paper className={'ShopViewDivContainer'}>

                <div className={'ShopViewDivHalfMenu'}>
                    <div className='shopDatadiv'>
                        <img src={aboutStore.o_image} alt={'image'} style={{maxWidth: '200px', height: '100px'}}/>
                        <h3>{aboutStore.o_name}</h3>
                        <h5>가게 전화번호 {aboutStore.o_phone}</h5>
                        <h5>영업시간 {aboutStore.o_time1} ~ {aboutStore.o_time2}</h5><br/>
                        <h4>{aboutStore.o_address}</h4>
                    </div>
                </div>

                <DivHalfMenu2>
                    <h3 style={{
                        background: '#f6f7f3',
                        // backgroundColor: 'rgba( 47, 138, 241, 0.1 )',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px',
                        marginBottom: '-5px',
                        borderTopRightRadius: '15px',
                        borderTopLeftRadius: '15px',
                        width: '100%',
                    }}>매장 위치 <GrMapLocation/></h3>
                    <Map
                        center={{lat: Number(aboutStore.o_latitude), lng: Number(aboutStore.o_longitude)}}
                        style={{width: "100%", height: "100%"}}
                    >
                        <MapMarker
                            position={{lat: Number(aboutStore.o_latitude), lng: Number(aboutStore.o_longitude)}}>
                            <DivMarker>{aboutStore.o_name}</DivMarker>
                        </MapMarker>
                    </Map>

                    <CopyToClipboard
                        text={aboutStore.o_address}>
                        <button className='shopDataBtn'
                                style={{
                                    backgroundColor: 'gray',
                                    borderBottomLeftRadius: '10px'
                                }}
                                onClick={() => {
                                    fireSweetAlert({
                                        title: '주소가 클립보드에 복사되었습니다',
                                        text: aboutStore.o_address,
                                        icon: 'success'
                                    })
                                }}>주소복사
                        </button>
                    </CopyToClipboard>

                    <button className='shopDataBtn'
                            style={{
                                backgroundColor: 'royalblue',
                                border: 'solid royalblue',
                                borderBottomRightRadius: '10px'
                            }}
                            onClick={() => window.open(`https://map.kakao.com/link/to/${aboutStore.o_name},${aboutStore.o_latitude},${aboutStore.o_longitude}`, '_blank')}>길찾기
                    </button>

                </DivHalfMenu2>
            </Paper>
        </>
    )
}