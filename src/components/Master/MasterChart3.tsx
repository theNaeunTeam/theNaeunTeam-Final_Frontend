import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import {Pie} from "react-chartjs-2";
import '../../lib/styles/masterOwnerDash.scss'

export default function MasterChart3() {

    const history = useHistory();

    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
    }, []);

    // 지역
    const [local, setLocal] = useState({
        busan: 0,
        chungcheong: 0,
        daegu: 0,
        daejeon: 0,
        gangwon: 0,
        gwangju: 0,
        gyeonggi: 0,
        gyeongsang: 0,
        incheon: 0,
        jeju: 0,
        jeonla: 0,
        seoul: 0,
        ulsan: 0,
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

        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            } else {
                alert('데이터를 가져오는데 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            }
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <>
            {/*<h3 style={{background:'#E7ECFF',*/}
            {/*            margin:'30px',*/}
            {/*            border: 'solid #E7ECFF 7px',*/}
            {/*            borderRadius: '40px 10px'*/}
            {/*}}>지역별 점주 분포 통계</h3>*/}
            {
                loading ?
                    null
                    :
                    <>
                        <h3 className='MODH3-1'>지역별 오너 분포 통계</h3>
                        <Pie
                            type="outlabeledPie"
                            data={{
                                labels: ["서울", "대전", "대구", "부산", "울산", "광주", "제주도", "경상도", "강원도", "충청도", "전라도", "경기도", "인천"],
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
                                // @ts-ignore
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
                            }}
                        />

                    </>
            }
        </>
    )
}

