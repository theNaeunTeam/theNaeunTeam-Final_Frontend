import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {ownerPageType} from "../../modules/types";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import OwnerNavbar from "./OwnerNavbar";

const DivContainer = styled.div`
  border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 50px;
  padding: 10px;
  height: 1000px;
  width: 100%;


`;

const DivHalfMenu = styled.div`
  //flex: 1;
  display: inline-flex;
  margin: 10px;
  padding: 10px;
  width: 100%;

`;

const DivChart = styled.div`
  //flex: 1;
  display: block;
  margin: 10px;
  padding: 10px;

`;
const DivChart1 = styled.div`
  display: block;
`;
const DivChart2 = styled.div`
  display: inline-flex;
`;

const LineDiv = styled.div`
  display: block;
  margin: 10px;
  padding: 10px;
  border: solid;
  width: 33%;
  height: 100%;
  text-align: center;
`;

const DivNav = styled.div`
  width: 20%;
  font-size: large;

`;
const DivMain = styled.div`
  width: 70%;
  height: 100%;
`;
export default function OwnerMain() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!authReducer.isOwner) history.push('/err');
    }, []);

    const initialValue = {
        o_name: '',
        total: 0,
        monTotal: 0,
        buyTotal: 0,
    };


    const [ownerPage, setOwnerPage] = useState<ownerPageType>(initialValue);
    const [ownerDay, setOwnerDay] = useState([]);
    const [ownerMon, setOwnerMon] = useState([]);
    const [ownerYear, setOwnerYear] = useState([]);

    useEffect(() => {
        initialize();
    }, []);


    const initialize = async () => {
        const URL = '';
        const URL_D = 'owner/getDay';
        try {
            const res = await client.get(URL);
            console.log(res);
            setOwnerPage(res.data);

            const response = await client.get(URL_D);
            // const dayArr = day.data.map((x: any) => x.date);
            // const daySumArr = day.data.map((x: any) => x.sum);

            setOwnerDay(response.data['day']);
            setOwnerMon(response.data['mon']);
            setOwnerYear(response.data['year']);
            console.log(response.data);

        } catch (e) {
            console.log(e);
        }
    };


    return (
        <DivContainer>
            <DivNav>
                <OwnerNavbar/>
            </DivNav>
            <DivMain>
                <h3>{ownerPage.o_name}</h3>
                <DivHalfMenu>
                    <LineDiv>총 판매 금액 : {ownerPage.total} 원</LineDiv>
                    <LineDiv>이번달 수익 : {ownerPage.monTotal} 원</LineDiv>
                    <LineDiv>총 구매자 : {ownerPage.buyTotal} 명</LineDiv>
                </DivHalfMenu>
                <DivChart>
                    <DivChart1>
                        <ComposedChart
                            width={1200}
                            height={500}
                            data={ownerMon}
                            margin={{top: 40, right: 40, bottom: 30, left: 40}}
                        >
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="date"/>
                            <YAxis label={{value: '원', position: 'top'}}/>
                            <Tooltip/>
                            <Legend/>
                            <Bar name="매출액" dataKey="sum" barSize={20} fill="#7ac4c0"/>
                        </ComposedChart>
                    </DivChart1>
                    <DivChart2>
                        <ComposedChart
                            width={550}
                            height={350}
                            data={ownerDay}
                            margin={{top: 40, right: 40, bottom: 30, left: 40}}
                        >
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar name="매출액" dataKey="sum" barSize={20} fill="#7ac4c0"/>

                        </ComposedChart>

                        <ComposedChart
                            width={550}
                            height={350}
                            data={ownerYear}
                            margin={{top: 40, right: 40, bottom: 30, left: 40}}

                        >
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar name="매출액" dataKey="sum" barSize={20} fill="#7ac4c0"/>

                        </ComposedChart>
                    </DivChart2>
                </DivChart>
            </DivMain>
        </DivContainer>
    )
}