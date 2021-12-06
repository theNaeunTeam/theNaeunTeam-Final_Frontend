import React from 'react';
import {Line} from "react-chartjs-2";
import MasterChart2Container from "../../containers/Master/MasterChart2Container";

export default function MasterChart(props: { loading: any; monArr: any; monIndex: any; DecMonYear: any; monYear: any; IncMonYear: any; yearArr: any; yearIndex: any; DecYear: any; IncYear: any; }) {

    const {
        loading,
        monArr,
        monIndex,
        DecMonYear,
        monYear,
        IncMonYear,
        yearArr,
        yearIndex,
        DecYear,
        IncYear,
    } = props;

    return (
        <>
            <div className="flex-container-1">
                <div className="flex-items-1">

                    {
                        loading ?
                            null
                            :
                            <>
                                <h3 className='MODH3'>월별 오너/유저 가입자수 통계 </h3>

                                <Line data={{
                                    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                                    datasets: [
                                        {
                                            label: "오너 가입자수",
                                            data: monArr[monIndex].map((a: any) => a.owner),
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
                                            data: monArr[monIndex].map((a: any) => a.user),
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
                                    <span style={{fontSize: 'larger'}} onClick={DecMonYear}>◀</span>
                                    <label style={{fontSize: 'larger'}} className='b'>{monYear}년</label>
                                    <span style={{fontSize: 'larger'}} onClick={IncMonYear}>▶</span>
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
                                    labels: yearArr.slice(yearIndex - 3, yearIndex).map((x: any) => x.date),
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
                                    <span style={{fontSize: 'larger'}} onClick={DecYear}>◀</span>
                                    <span style={{fontSize: 'larger'}} onClick={IncYear}>▶</span>
                                </div>
                            </>
                    }
                </div>
            </div>
            <br/>

            <MasterChart2Container/>

        </>
    )
}