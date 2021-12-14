import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {ownerPageType} from "../../lib/types";
import '../../lib/styles/button.scss'
import OwnerMain from "../../components/Owner/OwnerMain";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function OwnerMainContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) {
            alert('로그인 후 이용가능합니다.');
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
    const [loading, setLoading] = useState(true);

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
        if (localStorage.getItem('ownerToken')) {
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
        setLoading(true);
        const URL = '';
        const URL_D = 'owner/getDay';
        try {
            const res = await client.get(URL);
            setOwnerPage(res.data);

            const response = await client.get(URL_D);
            setDayArr(response.data['d'].map((x: any) => x.map((b: any) => b.date)));
            setDaySumArr(response.data['d'].map((x: any) => x.map((b: any) => b.sum)));


            setMonSumArr(response.data['m'].map((x: any) => x.map((b: any) => b.sum)));


            setYearArr(response.data['year'].map((x: any) => x.date + '년'));
            setYearSumArr(response.data['year'].map((x: any) => x.sum));
        } catch (e: any) {
            if (e.response.data.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else {
                fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            }
        }
        setLoading(false)

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
    }
    const subYIdx = () => {
        if (yearIdx >= yearArr.length && yearIdx - 3 > 0) {
            setYearIdx(yearIdx - 1);
        }
    }
    const desYIdx = () => {
        if (yearArr.length - 3 <= yearIdx && yearIdx < yearArr.length) {
            setYearIdx(yearIdx + 1);
        }
    }

    const dayInit = () => {
        setDayIdx(dayArr.length - 1);
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
        <OwnerMain loading={loading} ownerPage={ownerPage} dayArr={dayArr} dayIdx={dayIdx} daySumArr={daySumArr}
                   option={option} subDIdx={subDIdx} desDIdx={desDIdx} monSumArr={monSumArr} monIdx={monIdx}
                   subIdx={subIdx} monYear={monYear} desIdx={desIdx} yearArr={yearArr} yearIdx={yearIdx}
                   yearSumArr={yearSumArr} subYIdx={subYIdx} desYIdx={desYIdx}/>
    )
}