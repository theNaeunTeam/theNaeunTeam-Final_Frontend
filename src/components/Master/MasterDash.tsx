import * as React from 'react';
import {useEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {saleType} from "../../modules/types";
import {Bar} from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";

// 대시 보드
export default function MasterDash() {


    const [month, setMonth] = useState<saleType[]>([{
        date: '',
        sum: 0,
        tal: 0,
    }]);

    const [year, setYear] = useState<saleType[]>([]);
    const [loading, setLoading] = useState(true)

    var now = new Date();	// 현재 날짜 및 시간
    var year1 = now.getFullYear();	// 연도
    const [masterMon, setMasterMon] = useState([]);
    const [a, setA] = useState(1);

    useEffect(() => {
        chart();
    }, []);


    //차트 데이터 가져오기
    const chart = async () => {
        const URL = '/master/masterMonth';
        try {
            const res = await client.get(URL);
            const monArr = res.data.totalMon.map((x:any)=> x.sum);
            console.log(monArr);
            console.log(res.data);
            // setMasterMon(res.data['totalMon']);
            // console.log(year);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const Increase = () => {
        setA(a + 1);
    }

    const Decrease = () => {
        setA(a - 1);
    }

    return (
        <>
            <h3>대시보드 </h3>
            {
                loading ?
                    <Skeleton variant="rectangular" width={210} height={118}/>
                :
                <>
                    <Bar data={{
                        labels: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월"
                        ],
                        datasets: [
                            {
                                label: "가입자수",
                                backgroundColor: "rgba(255,99,132,0.2)",
                                borderColor: "rgba(255,99,132,1)",
                                borderWidth: 1,
                                //stack: 1,
                                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                hoverBorderColor: "rgba(255,99,132,1)",
                                data: []
                            },
                            {
                                label: "탈퇴자수",
                                backgroundColor: "rgba(155,231,91,0.2)",
                                borderColor: "rgba(255,99,132,1)",
                                borderWidth: 1,
                                //stack:tal
                                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                hoverBorderColor: "rgba(255,99,132,1)",
                                data: []
                            }]
                    }}/>
                    <button onClick={Decrease}>-</button>
                    <label>{year1}</label>
                    <button onClick={Increase}>+</button>
                </>
            }
        </>
    )
}