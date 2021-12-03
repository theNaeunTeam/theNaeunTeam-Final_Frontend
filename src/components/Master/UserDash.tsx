import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {Bar} from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import {useHistory} from "react-router-dom";
import '../../styles/masterOwnerDash.scss';


export default function UserDash() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
    }, []);

    // 년도별 월데이터를 담을 어레이
    const [monArr, setMonArr] = useState<any[]>([]);
    // 년도별 월데이터를 보여주기 위한 index 값
    const [monIdex, setMonIndex] = useState(0);
    // 년도를 보여주기 위한 year state
    const [monYear, setMonYear] = useState(0);

    const [yearArr, setYearArr] = useState<any[]>([]);

    const [yearIndex, setYearIndex] = useState(0);

    const [year, setYear] = useState(0);

    const [loading, setLoading] = useState(true)

    var now = new Date();	// 현재 날짜 및 시간
    var year1 = now.getFullYear();	// 연도

    useEffect(() => {
        chart();
    }, []);


    useEffect(() => {
        monInit();
    }, [monArr])


    useEffect(() => {
        yearInit();
    }, [yearArr])

    const monInit = () => {
        // 제일 최근년도의 인덱스값 초기화
        setMonIndex(monArr.length - 1);
        console.log(monIdex);
        // 제일 최근년도 초기화
        setMonYear(2019 + monArr.length - 1);
    }

    const yearInit = () => {
        setYearIndex(yearArr.length);
        setYear(2019 + yearArr.length - 1);
    }

    //차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/userMonth';
        try {
            const res = await client.get(URL);

            console.log(res.data);

            setMonArr(res.data['totalMon'].map((x: any) => x.map((b: any) => ({sum: b.sum, tal: b.tal}))));
            console.log(monArr);
            console.log(monArr.length);
            console.log('------------');
            console.log(res.data['year'].map((b: any) => ({date: b.date, sum: b.sum, tal: b.tal})));
            setYearArr(res.data['year'].map((b: any) => ({date: b.date, sum: b.sum, tal: b.tal})));
            console.log(yearArr.map((x:any)=>x.date));

            setLoading(false);

        } catch (e) {
            console.log(e);
        }
    };


    // 12달 증감버튼
    const IncMonYear = () => {
        console.log(monArr.length);
        if (monIdex != monArr.length - 1) {
            setMonIndex(monIdex + 1);
            setMonYear(monYear + 1);

        }
    }
    const DecMonYear = () => {
        if (monIdex != 0 ) {
            setMonIndex(monIdex - 1);
            setMonYear(monYear -1);
        }
    }

    // 년도별 증감버튼
    const IncYear = () => {
        console.log('년도+1');
        console.log(yearArr);
        console.log(yearIndex);
        console.log(yearArr.slice(yearIndex - 3, yearIndex));

        if (0 <= yearIndex && yearIndex <= (yearArr.length - 1)) {
            setYearIndex(yearIndex + 1);
            setYear(year +1)
        }
    }

    const DecYear = () => {
        console.log('년도-1');
        console.log(yearIndex);
        console.log(yearArr.length);
        if (yearIndex >= yearArr.length && yearIndex-3 > 0) {
            setYearIndex(yearIndex - 1);
            setYear(year - 1);
        }
    }

    return (
        <>
            <div className='qqq'>
                <h3 style={{background:'white',
                            borderRadius:'40px',
                            padding:'15px',
                            fontFamily:'Chosunilbo_myungjo',
                            fontSize:'xx-large',
                            border:'3px solid darkblue',
                            margin:'0px 300px 50px'
                }}>유저 가입/탈퇴 통계</h3>
            </div>
            
            <div className="flex-container-1">
                <div className="flex-items-1">
                {
                    loading ?
                            null
                        :
                        <>
                            <h3 className='MODH3'>Month</h3>
                            <Bar data={{
                                labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                                datasets: [
                                    {
                                        label: "가입자수",
                                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                        borderColor: 'rgba(75, 192, 192, 0.8)',
                                        borderWidth: 1,
                                        //stack: 1,
                                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                        hoverBorderColor: "rgba(255,99,132,1)",
                                        data: monArr[monIdex].map((a: any) => a.sum),
                                    },
                                    {
                                        label: "탈퇴자수",
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 1,
                                        //stack:tal
                                        hoverBackgroundColor:  'rgba(54, 162, 235, 0.4)',
                                        hoverBorderColor:  'rgba(54, 162, 235, 1)',
                                        data: monArr[monIdex].map((a: any) => a.tal),
                                    }]
                            }}
                                 options={
                                     {
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
                                         scales: {
                                             yAxes: {
                                                 ticks: {
                                                     callback: function (value: string | number) {
                                                         return value + '명';
                                                     }

                                                 }
                                             }
                                         }
                                     }

                                 }/>
                            <div className='aa'>
                                <span style={{fontSize:'larger'}} onClick={DecMonYear}>◀</span>
                                <label style={{fontSize:'larger'}} className='b'>{monYear}년</label>
                                <span style={{fontSize:'larger'}} onClick={IncMonYear}>▶</span>
                            </div>
                        </>
                }
                </div>
                <div className="flex-items-1">
                {
                        <>
                            <h3 className='MODH3'>Year</h3>
                            <Bar data={{
                                labels: yearArr.slice(yearIndex -3, yearIndex).map((x:any)=>x.date),
                                datasets: [
                                    {
                                        label: "가입자수",
                                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                        //stack: 1,
                                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                        hoverBorderColor: "rgba(255,99,132,1)",
                                        data: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => (x.sum)),
                                    },
                                    {
                                        label: "탈퇴자수",
                                        backgroundColor: "rgba(255,99,132,0.4)",
                                        borderColor: "rgba(255,99,132,1)",
                                        borderWidth: 1,
                                        //stack:tal
                                        hoverBackgroundColor:  'rgba(54, 162, 235, 0.4)',
                                        hoverBorderColor:  'rgba(54, 162, 235, 1)',
                                        data: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => (x.tal)),
                                    }]
                            }}
                                 options={
                                     {
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
                                         scales: {
                                             yAxes: {
                                                 ticks: {
                                                     callback: function (value: string | number) {
                                                         return value + '명';
                                                     }

                                                 }
                                             }
                                         }
                                     }

                                 }/>
                            <div className='aa'>
                                <span style={{fontSize:'larger'}} onClick={DecYear}>◀</span>
                                <span style={{fontSize:'larger'}} onClick={IncYear}>▶</span>
                            </div>
                        </>
                }
                </div>
            </div>
        </>
    );
}

