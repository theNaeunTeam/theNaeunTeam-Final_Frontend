import * as React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useEffect, useState} from "react";
import {client} from "../../lib/api/client";
import {type} from "os";
import {saleType} from "../../modules/types";

// 대시 보드
export default function MasterDash() {



    const [month, setMon] = useState<saleType[]>([]);

    useEffect(()=>{
        chart();
    },[])


    //차트 데이터 가져오기
    const chart = async ()=>{

        const URL = '/master/masterMonth';

        try {
            const res = await client.get(URL);

            console.log('마스터 달');
            console.log(res);
            setMon(res.data);
        }catch (e){
            console.log(e);
        }
    };

    return (
        <>
            <h3>대시보드 </h3>
            <ComposedChart
                width={1000}
                height={300}
                // @ts-ignore
                data={month}
                margin={{
                    top: 5, right: 50, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sum" name="sum" fill="#82ca9d" />
                <Line type="monotone" dataKey="tal" name="tal" stroke="#ff7300" />
            </ComposedChart>
        </>
    )
}