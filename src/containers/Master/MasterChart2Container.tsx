import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import '../../lib/styles/button.scss';
import '../../lib/styles/masterOwnerDash.scss';
import MasterChart2 from "../../components/Master/MasterChart2";

export default function MasterChart2Container() {

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
        // 제일 최근년도 초기화
    }

    const yearInit = () => {
        setYearIndex(yearArr.length);
        setMonYear(2019 + yearArr.length - 1);
    }

    // 차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/OwnerUserChart2';
        try {
            const res = await client.get(URL);

            setMonArr(res.data['totalMon'].map((x: any) => x.map((b: any) => ({owner: b.sum, user: b.tal}))));
            setYearArr(res.data['year'].map((b: any) => ({date: b.date, owner: b.sum, user: b.tal})));
        } catch (e: any) {
            if (e.response.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            } else {
                alert('데이터를 가져오는데 에러가 발생했습니다.\n잠시 후 다시 시도 바랍니다.');
            }
        }
        setLoading(false);
    };

    // 12달 증감버튼
    const IncMonYear = () => {
        if (monIndex != monArr.length - 1) {
            setMonIndex(monIndex + 1);
            setMonYear(monYear + 1);

        }
    }
    const DecMonYear = () => {
        if (monIndex != 0) {
            setMonIndex(monIndex - 1);
            setMonYear(monYear - 1);
        }
    }

    // 년도별 증감버튼
    const IncYear = () => {
        if (0 <= yearIndex && yearIndex <= (yearArr.length - 1)) {
            setYearIndex(yearIndex + 1);
        }
    }

    const DecYear = () => {
        if (yearIndex >= yearArr.length && yearIndex - 3 > 0) {
            setYearIndex(yearIndex - 1);
        }
    }


    return (
        <MasterChart2 loading={loading} monArr={monArr} monIndex={monIndex} DecMonYear={DecMonYear} monYear={monYear}
                      IncMonYear={IncMonYear} yearArr={yearArr} yearIndex={yearIndex} DecYear={DecYear}
                      IncYear={IncYear}/>
    )
}

