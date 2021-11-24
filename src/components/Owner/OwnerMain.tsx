import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {ownerPageType} from "../../modules/types";
import {Bar} from 'react-chartjs-2';

// import {
//     ResponsiveContainer,
//     ComposedChart,
//     Line,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
// } from 'recharts';
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
  display: block;
  width: 50%;
`;
const DivChart3 = styled.div`
  display: flex;`;


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

    const [dayArr, setDayArr] = useState([]);
    const [daySumArr, setDaySumArr] = useState([]);

    const [monSumArr, setMonSumArr] = useState([]);

    const [yearArr, setYearArr] = useState([]);
    const [yearSumArr, setYearSumArr] = useState([]);

    const [monIdx, setMonIdx] = useState(0);
    const [monYear, setMonYear] = useState(0);
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
            setDayArr(response.data['day'].map((x: any) => x.date));
            setDaySumArr(response.data['day'].map((x: any) => x.sum));


            setMonSumArr(response.data['m'].map((x: any) => x.map((b: any) => b.sum)));


            setYearArr(response.data['year'].map((x: any) => x.date));
            setYearSumArr(response.data['year'].map((x: any) => x.sum));

            console.log('---------------------');
            console.log(response.data);
            console.log(response.data['m'].map((x: any) => x.map((b: any) => b.sum)));
            console.log('---------------------');
            console.log(response.data['m'].length);
            console.log(monSumArr);
            console.log(monSumArr.length);
            setMonIdx(monSumArr.length-1)
            setMonYear(2019+monSumArr.length-1)
        } catch (e) {
            console.log(e);
        }

    };

    const subIdx = () => {
        setMonIdx(monIdx - 1);
        setMonYear(monYear - 1);
    }

    const desIdx = () => {
        setMonIdx(monIdx + 1);
        setMonYear(monYear + 1);
    }

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

                        <Bar
                            data={{
                                labels: dayArr,
                                datasets: [{

                                    label: '일별 매출액',
                                    data: daySumArr,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 205, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(201, 203, 207, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)',
                                        'rgb(75, 192, 192)',
                                        'rgb(54, 162, 235)',
                                        'rgb(153, 102, 255)',
                                        'rgb(201, 203, 207)'
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                        />
                    </DivChart1>
                    <DivChart3>
                        <DivChart2>
                            <Bar
                                data={{
                                    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                    datasets: [{

                                        label: monYear + '년',
                                        data: monSumArr[monIdx],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 205, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(201, 203, 207, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 205, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgb(54, 162, 235)',
                                            'rgb(153, 102, 255)',
                                            'rgb(201, 203, 207)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                            />
                            <button onClick={subIdx}>-</button>
                            <button onClick={desIdx}>+</button>
                        </DivChart2>
                        <DivChart2>
                            <Bar
                                data={{
                                    labels: yearArr,
                                    datasets: [{

                                        label: '연별 매출액',
                                        data: yearSumArr,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 205, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(201, 203, 207, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 205, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgb(54, 162, 235)',
                                            'rgb(153, 102, 255)',
                                            'rgb(201, 203, 207)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                            />
                        </DivChart2>
                    </DivChart3>
                </DivChart>
            </DivMain>
        </DivContainer>
    )
}