import {useHistory} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {client} from "../../lib/api/client";
import styled from "styled-components";
import OwnerNavbar from "./OwnerNavbar";
import {Doughnut, Line} from 'react-chartjs-2';


const DivContainer = styled.div`
  border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  border: solid blue;
  width: 17%;
  font-size: large;
`;
const DivMain = styled.div`
  border: solid red;
  width: 80%;
  height: 100%;
  padding: 20px;
`;

const DivChart = styled.div`
  display: block;
  margin: 10px;
  padding: 10px;
`;

const DivChart1 = styled.div`
  display: block;
`;
const DivChart2 = styled.div`
  display: inline-flex;
  border: solid;
`;

export default function OwnerDashF() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();

    const [childLoading, setChildLoading] = useState(true);
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.push('/err');
    }, []);

    const [time, setTime] = useState([]);
    const [timeCnt, setTimeCnt] = useState([]);
    const [gender, setGender] = useState([]);
    const [genderArr, setGenderArr] = useState([]);

    const [ageArr, setAgeArr] = useState([]);
    const [ageCnt, setAgeCnt] = useState([]);

    const [cateArr, setCateArr] = useState([]);
    const [cateCnt, setCateCnt] = useState([]);

    const [total, setTotal] = useState(0);
    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URLT = '/owner/getTime';
        const URLG = '/owner/getGender';
        const URLA = '/owner/getAge';
        const URLC = '/owner/getCategorySale';
        try {
            const reTime = await client.get(URLT);
            setTime(reTime.data.map((x: any) => x.tal+'시'));
            console.log(time);
            setTimeCnt(reTime.data.map((x: any) => x.sum));
            console.log('-----------------------')
            console.log(timeCnt);

            const reGender = await client.get(URLG);
            console.log(reGender);
            setGenderArr(reGender.data.map((x: any) => x.date));
            setGender(reGender.data.map((x: any) => x.sum));

            const reAge = await client.get(URLA);
            setAgeArr(reAge.data.map((x: any) => x.date));
            setAgeCnt(reAge.data.map((x: any) => x.sum));

            const reCate = await client.get(URLC);
            setCateArr(reCate.data.map((x: any) => x.date));
            setCateCnt(reCate.data.map((x: any) => x.sum));


            setTotal(reGender.data[0].sum + reGender.data[1].sum);
            
            console.log(reTime);
            console.log(reCate);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <DivContainer>
            <DivNav>
                <OwnerNavbar/>
            </DivNav>
            <DivMain>
                <h3>판매</h3>
                <div> 총 예약 판매 건수 : {total} </div>
                <DivChart>
                    <DivChart1>
                        <Line data={{
                            labels: time,
                            datasets: [
                                {
                                    label: '시간대별 예약 수',
                                    data: timeCnt,
                                    fill: false,
                                    borderColor: 'rgba(000, 051, 255,0.2)',
                                    tension: 0.3
                                }
                            ]
                        }}/>
                    </DivChart1>
                    <DivChart2>

                        <Doughnut
                            data={{
                                labels: genderArr,
                                datasets: [
                                    {
                                        label: '성별 구매 비율',
                                        data: gender,
                                        backgroundColor: [
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',

                                        ],
                                        borderColor: [
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 99, 132, 1)',

                                        ],
                                        borderWidth: 1,
                                    }
                                ]
                            }}/>
                    </DivChart2>
                    <DivChart2>
                        <Doughnut
                            data={{
                                labels: ageArr,
                                datasets: [
                                    {
                                        label: '연령대 구매 비율',
                                        data: ageCnt,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                        ],
                                        borderWidth: 1,
                                    }
                                ]
                            }}/>
                    </DivChart2>
                    <DivChart2>
                        <Doughnut data={{
                            labels: cateArr,
                            datasets: [{
                                label: '카테고리별 구매',
                                data: cateCnt,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            }]
                        }}/>
                    </DivChart2>
                </DivChart>
            </DivMain>
        </DivContainer>
    )
}
