import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import Skeleton from "@mui/material/Skeleton";
import {useHistory} from "react-router-dom";
import {Pie} from "react-chartjs-2";

export default function MasterChart3() {

    const history = useHistory();

    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.push('/err');
    }, []);

    // 지역
    const [local, setLocal] = useState({
        busan: 0,
        chungcheong:0,
        daegu:0,
        daejeon:0,
        gangwon:0,
        gwangju:0,
        gyeonggi:0,
        gyeongsang:0,
        incheon:0,
        jeju:0,
        jeonla:0,
        seoul:0,
        ulsan:0,
    });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        chart();
    }, []);

    // 차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/OwnerUserChart3';
        try {
            const res = await client.get(URL);
            
            console.log(res.data);
            setLocal(res.data);
            console.log('7777777777777777777777');
            console.log(local);

            setLoading(false);

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h4>지역별 점주 분포 통계</h4>
            {
                loading ?
                    <Skeleton variant="rectangular" width={210} height={118}/>
                    :
                    <>
                        <Pie
                            type="outlabeledPie"
                            data={{
                                labels: ["서울", "대전", "대구", "부산", "울산", "광주","제주도", "경상도", "강원도", "충청도", "전라도", "경기도", "인천" ],
                                datasets: [
                            {
                                label: "number of aircraft",
                                data: [local.seoul, local.daejeon, local.daegu, local.busan, local.ulsan, local.gwangju,
                                local.jeju, local.gyeongsang, local.gangwon, local.chungcheong, local.jeonla, local.gyeonggi, local.incheon], //fake data
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
    // @ts-ignore
                                zoomOutPercentage: 90,
                                title: {
                                    display: true,
                                    text: "Exchangables " ,
                                    fontSize: 25
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />

                    </>
            }
        </>
    )
}
