import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components'
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {ownerPageType} from "../../modules/types";
import '../../styles/button.scss'
import {Bar} from 'react-chartjs-2';
import OwnerNavbar from "./OwnerNavbar";
import FCM from "../../lib/FCM";

const DivContainer = styled.div`
  //border: solid black;
  //display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  //width: 97%;
  //min-width: 800px;
  clear: both;
  align-items: center;

`;
const DivHalfMenu = styled.div`
  //flex: 1;
  display: inline-flex;
  margin: 10px;
  //padding: 10px;
  //min-width: 97%;
  //border: solid green;
  //min-width: 500px;
  width: 90%;
  padding-left: 5%;

`;

const DivHalfMenu1 = styled.div`
  display: inline-flex;
  margin: 10px;
  width: 90%;
  padding-left: 5%;
  height: 80px;
  vertical-align: center;
  text-align: center;
`;
const DivChart = styled.div`
  //flex: 1;
  display: block;
  margin: 10px;
  padding: 10px;
  //border: solid green;

`;
const DivChart1 = styled.div`
  display: block;
  border: 1px solid #7EA0EA;
  width: 70%;
  margin: 15px auto;
  border-radius: 40px;
  padding: 25px;

`;
const DivChart2 = styled.div`
  display: block;
  width: 50%;
  border: 1px solid #7EA0EA;
  border-radius: 40px;
  padding: 15px;
  margin: 10px;
`;
const DivChart3 = styled.div`
  display: flex;
  //border: solid grey;
`;

const LineDiv = styled.div`
  display: block;
  padding: 10px;
  border: solid;
  width: 20%;
  height: 50px;
  text-align: center;
  border: solid grey;
  margin-left: 10%;
  border-radius: 20px;
`;


export default function OwnerMain() {

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) {
            alert('가맹점 로그인 후 이용가능합니다.');
            history.replace('/login');
        }
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
    const [dayIdx, setDayIdx] = useState(0);
    const [yearIdx, setYearIdx] = useState(0);
    useEffect(() => {
        if(localStorage.getItem('ownerToken')){
            initialize();
        }
    }, []);

    useEffect(() => {
        monInit();
    }, [monSumArr]);

    useEffect(() => {
        yearInit()
    }, [yearArr]);

    useEffect(() => {
        dayInit();
    }, [dayArr]);

    const initialize = async () => {
        const URL = '';
        const URL_D = 'owner/getDay';
        try {
            const res = await client.get(URL);
            console.log(res);
            setOwnerPage(res.data);

            const response = await client.get(URL_D);
            setDayArr(response.data['d'].map((x: any) => x.map((b: any) => b.date)));
            setDaySumArr(response.data['d'].map((x: any) => x.map((b: any) => b.sum)));


            setMonSumArr(response.data['m'].map((x: any) => x.map((b: any) => b.sum)));
            console.log(response.data['m'].map((x: any) => x.map((b: any) => b.sum)));
            console.log('aaaaaaaaaaaaaaaa');


            setYearArr(response.data['year'].map((x: any) => x.date + '년'));
            setYearSumArr(response.data['year'].map((x: any) => x.sum));

            console.log('---------------------');
            console.log(response.data);
            // console.log(response.data['m'].map((x: any) => x.map((b: any) => b.sum)));
            // console.log('---------------------');
            // console.log(response.data['m'].length);
            // console.log(response.data['year'].map((x: any) => x.date));
            // console.log(response.data['year'].map((x: any) => x.sum));
            // console.log(response.data['year'].length);
        } catch (e:any) {
            console.log(e);
            if(e.response.data.status === 500){
                alert('서버 작동 중 에러가 발생했습니다. 잠시 후 다시 시도 바랍니다.');

            }else{
                alert('데이터를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도 바랍니다.')
            }
        }

    };

    // 월별 매출
    const monInit = () => {

        setMonIdx((monSumArr.length - 1));
        setMonYear(2019 + (monSumArr.length - 1));

    }
    const subIdx = () => {

        if (monIdx != 0) {
            setMonIdx(monIdx - 1);
            setMonYear(monYear - 1);
        }
    }
    const desIdx = () => {
        if (monIdx != monSumArr.length - 1) {
            setMonIdx(monIdx + 1);
            setMonYear(monYear + 1);
        }
    }

    // 연도별 매출
    const yearInit = () => {
        setYearIdx(yearArr.length);
        console.log('------')
        console.log(yearArr.length);
    }
    const subYIdx = () => {
        console.log(yearIdx);
        console.log(yearArr.length - 1);

        if (yearIdx >= yearArr.length && yearIdx - 3 > 0) {
            setYearIdx(yearIdx - 1);
            console.log(yearIdx + "!!!!");
        }
    }
    const desYIdx = () => {
        console.log(yearSumArr.slice(yearIdx - 3, yearIdx));
        if (yearArr.length - 3 <= yearIdx && yearIdx < yearArr.length) {
            setYearIdx(yearIdx + 1);
            console.log(yearIdx + "$$");
        }
    }

    const dayInit = () => {
        setDayIdx(dayArr.length - 1);
        console.log(dayArr);
        console.log('@#@#@')
    }

    const subDIdx = () => {
        if (dayIdx != 0) {
            setDayIdx(dayIdx - 1);
        }
    }
    const desDIdx = () => {
        if (dayIdx < dayArr.length - 1) {
            setDayIdx(dayIdx + 1);
        }
    }
    const option = {
        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    callback: function (value: any) {
                        if (value.toString().length > 8) return (Math.floor(value / 100000000)).toLocaleString("ko-KR") + "억원";
                        else if (value.toString().length > 4) return (Math.floor(value / 10000)).toLocaleString("ko-KR") + "만원";
                        else return value + '원';
                    }

                }
            }
        },
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

            <DivHalfMenu1>
                <h1 style={{marginRight : '30px'}}>{ownerPage.o_name}</h1>
                <FCM/>
            </DivHalfMenu1>

            <DivHalfMenu>

                <LineDiv> 총 판매 금액 : {ownerPage.total} 원</LineDiv>
                <LineDiv>이번달 수익 : {ownerPage.monTotal} 원</LineDiv>
                <LineDiv>총 구매자 : {ownerPage.buyTotal} 명</LineDiv>
            </DivHalfMenu>
            <DivChart>
                <DivChart1>
                    <Bar style={{height: '100px'}}
                         data={{
                             labels: dayArr[dayIdx],
                             datasets: [{
                                 label: '일일 매출액',
                                 data: daySumArr[dayIdx],
                                 backgroundColor: [
                                     'rgba(153, 102, 255,0.2)',
                                     'rgba(202, 051, 204,0.2)',
                                     'rgba(201, 203, 207,0.2)',
                                     'rgba(255, 051, 102,0.2)',
                                     'rgba(255, 051, 000,0.2)',
                                     'rgba(255, 99, 132,0.2)',
                                     'rgba(255, 204, 000,0.2)',
                                     'rgba(255, 159, 64,0.2)',
                                     'rgba(255, 205, 86,0.2)',
                                     'rgba(75, 192, 192,0.2)',
                                     'rgba(000, 051, 255,0.2)',
                                     'rgba(54, 162, 235,0.2)',
                                 ],
                                 borderColor: [
                                     'rgb(153, 102, 255)',
                                     'rgb(202, 051, 204)',
                                     'rgb(201, 203, 207)',
                                     'rgb(255, 051, 102)',
                                     'rgb(255, 051, 000)',
                                     'rgb(255, 99, 132)',
                                     'rgb(255, 204, 000)',
                                     'rgb(255, 159, 64)',
                                     'rgb(255, 205, 86)',
                                     'rgb(75, 192, 192)',
                                     'rgb(000, 051, 255)',
                                     'rgb(54, 162, 235)',

                                 ],
                                 borderWidth: 1
                             }]
                         }}
                         options={option}

                    />
                    <div className='aa'>
                        <span onClick={subDIdx}>◀ </span>
                        {dayIdx <= dayArr.length ? 2019 + parseInt(String(dayIdx / 12)) : null} 년 {dayIdx - parseInt(String(dayIdx / 12)) * 12 + 1} 월
                        <span onClick={desDIdx}> ▶</span>
                    </div>
                </DivChart1>
                <DivChart3>
                    <DivChart2>
                        <Bar
                            data={{
                                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                datasets: [{
                                    label: '월별 매출',
                                    data: monSumArr[monIdx],
                                    backgroundColor: [
                                        'rgb(75, 192, 192,0.2)',
                                        'rgba(000, 051, 255,0.2)',
                                        'rgb(54, 162, 235,0.2)',
                                        'rgb(153, 102, 255,0.2)',
                                        'rgba(102, 051, 204,0.2)',
                                        'rgb(201, 203, 207,0.2)',
                                        'rgba(255, 051, 102,0.2)',
                                        'rgba(255, 051, 000,0.2)',
                                        'rgb(255, 99, 132,0.2)',
                                        'rgba(255, 204, 000,0.2)',
                                        'rgb(255, 159, 64,0.2)',
                                        'rgb(255, 205, 86,0.2)',

                                    ],
                                    borderColor: [
                                        'rgb(75, 192, 192)',
                                        'rgba(000, 051, 255)',
                                        'rgb(54, 162, 235)',
                                        'rgb(153, 102, 255)',
                                        'rgba(102, 051, 204)',
                                        'rgb(201, 203, 207)',
                                        'rgba(255, 051, 102)',
                                        'rgba(255, 051, 000)',
                                        'rgb(255, 99, 132)',
                                        'rgba(255, 204, 000)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)',

                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            options={option}

                        />
                        <div className='aa'>
                            <span onClick={subIdx}>◀ </span>
                            {monYear}
                            <span onClick={desIdx}> ▶</span>
                        </div>
                    </DivChart2>
                    <DivChart2>
                        <Bar
                            data={{
                                labels: yearArr.slice(yearIdx - 3, yearIdx),
                                datasets: [{

                                    label: '연도별 매출액',
                                    data: yearSumArr.slice(yearIdx - 3, yearIdx),

                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 205, 86, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            options={option}
                        />
                        <div className='aa'>
                            <span onClick={subYIdx}>◀</span>
                            <span onClick={desYIdx}>▶</span>
                        </div>
                    </DivChart2>
                </DivChart3>
            </DivChart>

        </DivContainer>
    )
}
