import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import '../../lib/styles/masterOwnerDash.scss';
import UserDash from "../../components/Master/UserDash";


export default function UserDashContainer() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
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
        yearInit();
    }, [yearArr])

    const monInit = () => {
        // 제일 최근년도의 인덱스값 초기화
        setMonIndex(monArr.length - 1);
        // 제일 최근년도 초기화
        setMonYear(2019 + monArr.length - 1);
    }

    const yearInit = () => {
        setYearIndex(yearArr.length);
        setYear(2019 + yearArr.length - 1);
    }

    //차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/userMonth';
        try {
            const res = await client.get(URL);
            setMonArr(res.data['totalMon'].map((x: any) => x.map((b: any) => ({sum: b.sum, tal: b.tal}))));
            setYearArr(res.data['year'].map((b: any) => ({date: b.date, sum: b.sum, tal: b.tal})));
            setLoading(false);
        } catch (e) {
        }
    };


    // 12달 증감버튼
    const IncMonYear = () => {
        if (monIdex != monArr.length - 1) {
            setMonIndex(monIdex + 1);
            setMonYear(monYear + 1);

        }
    }
    const DecMonYear = () => {
        if (monIdex != 0) {
            setMonIndex(monIdex - 1);
            setMonYear(monYear - 1);
        }
    }

    // 년도별 증감버튼
    const IncYear = () => {
        if (0 <= yearIndex && yearIndex <= (yearArr.length - 1)) {
            setYearIndex(yearIndex + 1);
            setYear(year + 1)
        }
    }

    const DecYear = () => {
        if (yearIndex >= yearArr.length && yearIndex - 3 > 0) {
            setYearIndex(yearIndex - 1);
            setYear(year - 1);
        }
    }

    return (
        <UserDash loading={loading} monArr={monArr} monIdex={monIdex} DecMonYear={DecMonYear} monYear={monYear}
                  IncMonYear={IncMonYear} yearArr={yearArr} yearIndex={yearIndex} DecYear={DecYear} IncYear={IncYear}/>
    );
}

