import React from 'react';
import {Pie} from "react-chartjs-2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function MasterChart3(props: { loading: any; local: any; }) {
    const {
        loading,
        local
    } = props;
    return (
        <>
            {
                loading ?
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    :
                    <>
                        <h3 className='MODH3-1'>지역별 오너 분포 통계</h3>
                        <Pie
                            // type="outlabeledPie"
                            data={{
                                labels: ["서울", "대전", "대구", "부산", "울산", "광주", "제주도", "경상도", "강원도", "충청도", "전라도", "경기도", "인천"],
                                datasets: [
                                    {
                                        label: "number of aircraft",
                                        data: [local.seoul, local.daejeon, local.daegu, local.busan, local.ulsan, local.gwangju,
                                            local.jeju, local.gyeongsang, local.gangwon, local.chungcheong, local.jeonla, local.gyeonggi, local.incheon],
                                        backgroundColor: [

                                            'rgba(255, 051, 102,0.2)',
                                            'rgba(255, 051, 000,0.2)',
                                            'rgb(255, 99, 132,0.2)',
                                            'rgb(54, 162, 235,0.2)',
                                            'rgba(255, 204, 000,0.2)',
                                            'rgb(255, 159, 64,0.2)',
                                            'rgb(255, 205, 86,0.2)',
                                            'rgb(75, 192, 192,0.2)',
                                            'rgba(000, 051, 255,0.2)',
                                            'rgb(153, 102, 255,0.2)',
                                            'rgba(102, 051, 204,0.2)',
                                            'rgb(201, 203, 207,0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 051, 102)',
                                            'rgba(255, 051, 000)',
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgba(255, 204, 000)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 205, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgba(000, 051, 255)',
                                            'rgb(153, 102, 255)',
                                            'rgba(102, 051, 204)',
                                            'rgb(201, 203, 207)'
                                        ],
                                    }
                                ]
                            }}
                            options={{
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
                                /*
                                zoomOutPercentage: 90,
                                title: {
                                    display: true,
                                    text: "Exchangables ",
                                    fontSize: 25
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                                */
                            }}
                        />

                    </>
            }
        </>
    )
}
