import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {Bar} from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import {useHistory} from "react-router-dom";

// 대시 보드
export default function MasterDash() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.push('/err');
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
        // if(yearArr.length != 0){
        //     setYearIndex(yearArr[0].length);
        // }
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
        // setYearIndex(yearArr[0].length);
    }


    //차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/masterMonth';
        try {
            const res = await client.get(URL);

            console.log(res.data);

            setMonArr(res.data['totalMon'].map((x: any) => x.map((b: any) => ({sum: b.sum, tal: b.tal}))));
            console.log(monArr);
            // console.log(monArr[2].map((a:any)=> ({sum:a.sum})) );
            // console.log(monArr.map((x:any)) => x.sum );
            console.log(monArr.length);
            console.log('------------');
            console.log(res.data['year'].map((b: any) => ({date: b.date, sum: b.sum, tal: b.tal})));
            // setYearArr(res.data['totalYear'].map((x:any) => x.map((b:any) => ({date:b.date,sum:b.sum, tal:b.tal}))));
            // setYearArr(res.data['totalYear'].map((x:any) => x.map((b:any) => ({date:b.date,sum:b.sum, tal:b.tal}))));
            console.log('-------------------')
            // console.log(res.data['totalYear'].map((x:any)=>x.map((x:any)=>x.date)));
            console.log('----------');

            setLoading(false);

        } catch (e) {
            console.log(e);
        }
    };

    // 12달
    const IncMonYear = () => {
        // console.log(yearArr[0].map((x:any) => (x.date)));
        console.log(yearArr.length);
        if (monIdex != monArr.length - 1) {
            setMonIndex(monIdex + 1);
            setMonYear(monYear + 1);

        }
    }
    const DecMonYear = () => {
        if (yearIndex > yearArr[0].length - 1) {
            setYearIndex(yearIndex - 1);
        }
    }

    // 년도별
    const IncYear = () => {
        console.log(yearArr[0]);
        console.log(yearIndex);
        console.log(yearArr[0].slice(yearIndex - 3, yearIndex));
        console.log(yearArr[0].slice(yearIndex - 3, yearIndex).date);

        if (0 <= yearIndex && yearIndex <= (yearArr[0].length - 1)) {
            setYearIndex(yearIndex + 1);
        }
    }

    const DecYear = () => {
        console.log(yearArr[0]);
        console.log(yearIndex);
        console.log(yearArr[0].slice(yearIndex - 3, yearIndex));

        console.log(yearArr[0].slice(yearIndex - 3, yearIndex).date);
        if (yearIndex > yearArr[0].length - 1) {
            setYearIndex(yearIndex - 1);
        }
    }


    return (
        <>
            <h3>대시보드 </h3>
            {
                loading ?
                    <Skeleton variant="rectangular" width={210} height={118}/>
                    :
                    <>
                        <Bar data={{
                            labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                            datasets: [
                                {
                                    label: "가입자수",
                                    backgroundColor: "rgba(255,99,132,0.2)",
                                    borderColor: "rgba(255,99,132,1)",
                                    borderWidth: 1,
                                    //stack: 1,
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: monArr[monIdex].map((a: any) => a.sum),
                                },
                                {
                                    label: "탈퇴자수",
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1,
                                    //stack:tal
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: monArr[monIdex].map((a: any) => a.tal),
                                }]
                        }}
                             options={
                                 {
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
                        <button onClick={DecMonYear}>-</button>
                        <label>{monYear}</label>
                        <button onClick={IncMonYear}>+</button>
                    </>
            }
            {
                loading ?
                    <Skeleton variant="rectangular" width={210} height={118}/>
                    :
                    <>
                        <Bar data={{
                            labels: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => x.date),
                            datasets: [
                                {
                                    label: "가입자수",
                                    backgroundColor: "rgba(255,99,132,0.2)",
                                    borderColor: "rgba(255,99,132,1)",
                                    borderWidth: 1,
                                    //stack: 1,
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => (x.sum)),
                                },
                                {
                                    label: "탈퇴자수",
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1,
                                    //stack:tal
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: yearArr.map((x: any) => (x.tal)),
                                }]
                        }}
                             options={
                                 {
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
                        <button onClick={DecYear}>-</button>
                        <label>{monYear}</label>
                        <button onClick={IncYear}>+</button>
                    </>
            }
        </>

    )
}
