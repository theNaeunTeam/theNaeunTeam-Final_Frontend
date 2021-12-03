import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {Bar} from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import {useHistory} from "react-router-dom";
import '../../styles/masterOwnerDash.scss'
import '../../styles/button.scss'
import MasterChart3 from "./MasterChart3";

// 대시 보드
export default function MasterOwnerDash() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
    }, []);

    // 년도별 월데이터를 담을 어레이
    const [monArr, setMonArr] = useState<any[]>([]);
    // 년도별 월데이터를 보여주기 위한 index 값
    const [monIndex, setMonIndex] = useState(0);
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
        console.log(monIndex);
        // 제일 최근년도 초기화
        setMonYear(2019 + monArr.length - 1);
    }

    const yearInit = () => {
        setYearIndex(yearArr.length);
        setYear(2019 + yearArr.length - 1);
    }


    //차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/masterMonth';
        try {
            const res = await client.get(URL);

            console.log(res.data);

            setMonArr(res.data['totalMon'].map((x: any) => x.map((b: any) => ({sum: b.sum, tal: b.tal}) )));
            console.log('monarr');
            console.log(monArr);
            // console.log(monArr[2].map((a:any)=> ({sum:a.sum})) );
            // console.log(monArr.map((x:any)) => x.sum );
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
        if (monIndex != monArr.length - 1) {
            setMonIndex(monIndex + 1);
            setMonYear(monYear + 1);

        }
    }
    const DecMonYear = () => {
        if (monIndex != 0 ) {
            setMonIndex(monIndex - 1);
            setMonYear(monYear -1);
        }
    }

    // 년도별 증감버튼
    const IncYear = () => {
        if (0 <= yearIndex && yearIndex <= (yearArr.length - 1)) {
            setYearIndex(yearIndex + 1);
        }
    }

    const DecYear = () => { 
        if (yearIndex >= yearArr.length && yearIndex -3 > 0) {
            setYearIndex(yearIndex - 1);
        }
    }


    return (
        <>
            <div className='qqq'>
                <h2 style={{
                            borderRadius:'40px',
                            padding:'15px',
                            width:'50%',
                            color:'black',
                            fontSize:'30px',
                            border:'3px solid  darkblue',
                            fontFamily:'Chosunilbo_myungjo'
                }}>오너 가입/탈퇴 통계</h2>
            </div>
            <div className="flex-container0">
            <div className="flex-container">
            <div className="flex-items">
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
                                    data: monArr[monIndex].map((a: any) => a.sum),
                                },
                                {
                                    label: "탈퇴자수",
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                    //stack:tal
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: monArr[monIndex].map((a: any) => a.tal),
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
            <div className="flex-items">
            {   ///////////////////////////년도별
                loading ?
                    null
                    :
                    <>
                        <h3 className='MODH3'>Year</h3>
                        <Bar data={{
                            labels: yearArr.slice(yearIndex -3, yearIndex).map((x:any)=>x.date),
                            datasets: [
                                {
                                    label: "가입자수",
                                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                    borderColor: 'rgba(75, 192, 192, 0.8)',
                                    borderWidth: 1,
                                    //stack: 1,
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => (x.sum)),
                                },
                                {
                                    label: "탈퇴자수",
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                    //stack:tal
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
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
                                     },
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


            {/*<div className='qqq2'>*/}
            {/*    <h2 style={{background:'#E7ECFF',*/}
            {/*                borderRadius:'40px 10px',*/}
            {/*                padding:'15px'*/}
            {/*    }}>오너 지역별 분포 통계</h2>*/}
            {/*</div>*/}

            <div className="flex-container-2">
                <div className="flex-items-2">
                <div className="qqq3">
                    <MasterChart3/>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
