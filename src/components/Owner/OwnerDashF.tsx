import {useHistory} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {client} from "../../lib/api/client";
import styled from "styled-components";
import {Doughnut, Line} from 'react-chartjs-2';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";


const DivContainer = styled.div`
  //border: solid black;
  //display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  //width: 100%;
  clear: both;
  
`;

const DivChart = styled.div`
  display: block;
  margin: 10px;
  padding: 10px;
`;

const DivChart1 = styled.div`
  display: block;
  border: 1px solid #7EA0EA;
  border-radius: 40px;
  padding: 30px;
  width: 70%;
  margin : 15px auto;

`;
const DivChart2 = styled.div`
  display: inline-flex;
  border: 1px solid #7EA0EA;
  border-radius: 40px;
  padding: 30px;
  margin: 20px;
  width: 30%;
`;
const LineDiv = styled.div`
  display: block;
  padding-top: 15px;
  border: solid;
  width: 20%;
  height: 60px;
  text-align: center;
  border: solid grey;
  border-radius: 10px;
  margin-left: 10%;
  margin-top: 20px;
`;


export default function OwnerDashF() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
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
        if (localStorage.getItem('ownerToken')) {
            initialize();
        }
    }, []);

    const initialize = async () => {
        setLoading(true)
        const URLT = '/owner/getTime';
        const URLG = '/owner/getGender';
        const URLA = '/owner/getAge';
        const URLC = '/owner/getCategorySale';
        try {
            const reTime = await client.get(URLT);
            setTime(reTime.data.map((x: any) => x.tal + '시'));
            setTimeCnt(reTime.data.map((x: any) => x.sum));

            const reGender = await client.get(URLG);
            setGenderArr(reGender.data.map((x: any) => x.date));
            setGender(reGender.data.map((x: any) => x.sum));

            const reAge = await client.get(URLA);
            setAgeArr(reAge.data.map((x: any) => x.date));
            setAgeCnt(reAge.data.map((x: any) => x.sum));

            const reCate = await client.get(URLC);
            setCateArr(reCate.data.map((x: any) => x.date));
            setCateCnt(reCate.data.map((x: any) => x.sum));


            setTotal(reGender.data[0].sum + reGender.data[1].sum);


        } catch (e: any) {
            if (e.response.data.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. 잠시 후 다시 시도 바랍니다.');

            } else {
                alert('데이터를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도 바랍니다.')
            }
        }
        setLoading(false)
    }

    const option = {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 18
                    }
                }
            }
        },
    }
    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div style={{
                display: 'inline-flex',
                width: '100%',
                justifyContent: 'center',
                verticalAlign: 'center',
                marginBottom: '20px'
            }}>
                <h1>판매 현황</h1>
                <LineDiv> 총 예약 판매 건수 : {total} </LineDiv>
            </div>
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
                                backgroundColor: 'rgba(000, 051, 255,0.2)',
                                tension: 0.3
                            }
                        ]
                    }}
                          options={option}
                    />
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
                        }}
                        options={option}
                    />
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
                        }}
                        options={option}
                    />
                </DivChart2>
                <DivChart2>
                    <Doughnut data={{
                        labels: cateArr,
                        datasets: [{
                            label: '카테고리별 구매',
                            data: cateCnt,
                            backgroundColor: [
                                'rgba(153,255,255,0.3)',
                                'rgba(153,255,155,0.3)',
                                'rgba(222,222,239,0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(153,255,255,1.5)',
                                'rgba(153,255,155,1.5)',
                                'rgba(222,222,239,1)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                            ],
                            borderWidth: 1,
                        }]
                    }}
                              options={option}
                    />
                </DivChart2>
            </DivChart>

        </DivContainer>
    )
}
