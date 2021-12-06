import React from 'react';
import {Bar} from "react-chartjs-2";

export default function UserDash(props: { loading: any; monArr: any; monIdex: any; DecMonYear: any; monYear: any; IncMonYear: any; yearArr: any; yearIndex: any; DecYear: any; IncYear: any; }) {

    const {
        loading,
        monArr,
        monIdex,
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
            <h3 className={'mainH3'}>유저 가입/탈퇴 통계</h3>

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
                                            hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                                            hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
                                    <span style={{fontSize: 'larger'}} onClick={DecMonYear}>◀</span>
                                    <label style={{fontSize: 'larger'}} className='b'>{monYear}년</label>
                                    <span style={{fontSize: 'larger'}} onClick={IncMonYear}>▶</span>
                                </div>
                            </>
                    }
                </div>
                <div className="flex-items-1">
                    {
                        <>
                            <h3 className='MODH3'>Year</h3>
                            <Bar data={{
                                labels: yearArr.slice(yearIndex - 3, yearIndex).map((x: any) => x.date),
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
                                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                                        hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
                                <span style={{fontSize: 'larger'}} onClick={DecYear}>◀</span>
                                <span style={{fontSize: 'larger'}} onClick={IncYear}>▶</span>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}