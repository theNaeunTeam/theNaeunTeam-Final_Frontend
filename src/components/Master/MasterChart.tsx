import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {Line} from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import MasterChart2 from "./MasterChart2";
import '../../styles/button.scss';
import '../../styles/masterOwnerDash.scss'
import { IoCaretForward } from "react-icons/io5";

export default function MasterChart() {



    const DivChart2 = styled.div`
      display: block;
      width: 50%;
      text-align: center;
    `;

    const DivChart3 = styled.div`
      display: flex;
      margin-block: fill;
    `;


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

    const [loading, setLoading] = useState(true);

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
    }

    const yearInit = () => {
        setYearIndex(yearArr.length);
        setMonYear(2019 + yearArr.length -1 );
    }


    //차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/OwnerUserChart';
        try {
            const res = await client.get(URL);

            console.log(res.data);
            console.log(res.data['totalMon'].map((x:any) => x.map((b:any) => ({ owner:b.sum, user:b.tal}) )));
            setMonArr(res.data['totalMon'].map((x:any) => x.map((b:any) => ({ owner:b.sum, user:b.tal}) )));
            console.log(monArr);

            console.log('0000000000000');
            console.log(res.data['year'].map((b: any) => ({date: b.date, owner: b.sum, user: b.tal})));
            setYearArr(res.data['year'].map((b: any) => ({date: b.date, owner: b.sum, user: b.tal})));

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
            <div className="flex-container-1">
                <div className="flex-items-1">

                    {
                        loading ?
                            null
                            :
                            <>
                                <h3  className='MODH3'>월별 오너/유저 가입자수 통계 </h3>
                         
                                <Line data={{
                                    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                                    datasets: [
                                        {
                                            label: "오너 가입자수",
                                            data:monArr[monIndex].map((a:any) => a.owner),
                                            fill: false,
                                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            tension: 0.3
                                        },
                                        {
                                            label: "유저 가입자수",
                                            fill: false,
                                            backgroundColor: "rgba(255,99,132,0.4)",
                                            borderColor: "rgba(255,99,132,1)",
                                            data: monArr[monIndex].map((a:any) => a.user),
                                            tension: 0.3
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
                    {   ///////////////////////////년도별
                        loading ?
                           null
                            :
                            <>
                                <h3 className='MODH3'>년도별 오너/유저 가입자수 통계 </h3>
                                <Line data={{
                                    labels: yearArr.slice(yearIndex -3, yearIndex).map((x:any)=>x.date),
                                    datasets: [
                                        {
                                            label: "오너 탈퇴자수",
                                            fill: false,
                                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            data: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => (x.owner)),
                                            tension: 0.3
                                        },
                                        {
                                            label: "유저 탈퇴자수",
                                            fill: false,
                                            backgroundColor: "rgba(255,99,132,0.4)",
                                            borderColor: "rgba(255,99,132,1)",
                                            data: (yearArr.slice(yearIndex - 3, yearIndex)).map((x: any) => (x.user)),
                                            tension: 0.3
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
                                      }
                                     />

                                <div className='aa'>
                                <span style={{fontSize:'larger'}} onClick={DecYear}>◀</span>
                                <span style={{fontSize:'larger'}} onClick={IncYear}>▶</span>
                                </div>
                            </>
                    }
                    </div>
            </div>
            <br/>

            <MasterChart2/>

        </>
    )
}

