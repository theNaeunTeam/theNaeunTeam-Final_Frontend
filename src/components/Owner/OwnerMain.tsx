import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {ownerPageType, saleType} from "../../modules/types";
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

const DivContainer = styled.div`
  border: solid black;
  display: flex;
  justify-content: center;
  margin: 50px;
  padding: 10px;
  height: 1000px;
`;

const DivHalfMenu = styled.div`
  flex: 1;
  margin: 10px;
  padding: 10px;
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
    const sale = {
        date: '',
        sum: 0,
    }


    const [ownerPage, setOwnerPage] = useState<ownerPageType>(initialValue);
    const [ownerDay, setOwnerDay] = useState<saleType[]>([]);
    const [ownerMon, setOwnerMon] = useState<saleType[]>([]);
    const [ownerYear, setOwnerYear] = useState<saleType[]>([]);

    useEffect(() => {
        initialize();
    }, []);


    const initialize = async () => {
        const URL = '';
        const URL_D = 'owner/getDay';
        const URL_M = 'owner/getMon';
        const URL_Y = 'owner/getYear';
        try {
            const res = await client.get(URL);
            console.log(res);
            setOwnerPage(res.data);

            const day = await client.get(URL_D);
            const dayArr = day.data.map((x: any) => x.date);
            const daySumArr = day.data.map((x: any) => x.sum);
            console.log(day.data);
            console.log(dayArr);
            console.log(daySumArr);
            setOwnerMon(day.data);

            const mon = await client.get(URL_M);
            const monArr = mon.data.map((x: any) => x.date);
            const monSumArr = mon.data.map((x: any) => x.sum);

            const year = await client.get(URL_Y);
            const yearArr = year.data.map((x: any) => x.date);
            const yearSumArr = year.data.map((x: any) => x.sum);

        } catch (e) {
            console.log(e);
        }
    };


    return (
        <DivContainer>
            <DivHalfMenu>
                <h3>{ownerPage.o_name}</h3>
                <br/>
                <h5>총 판매 금액 : {ownerPage.total} 원</h5>
                <h5>이번달 수익 : {ownerPage.monTotal} 원</h5>
                <h5>총 구매자 : {ownerPage.buyTotal} 명</h5>

            </DivHalfMenu>
            <DivHalfMenu>
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={ownerMon}
                        margin={{top: 40, right: 40, bottom: 30, left: 40}}
                    >
                        <CartesianGrid stroke="#f5f5f5"/>
                        <XAxis dataKey="date"/>
                        <YAxis yAxisId="sum"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar yAxisId="sum" dataKey="sum" barSize={30} fill="#7ac4c0"/>

                    </ComposedChart>
                </ResponsiveContainer>
            </DivHalfMenu>
        </DivContainer>
    )
}