import {useHistory} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {client} from "../../lib/api/client";
import OwnerMainDashF from "../../components/Owner/OwnerMainDashF";
import {useSweetAlert} from "../../lib/useSweetAlert";


export default function OwnerDashFContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const [time, setTime] = useState([]);
    const [timeCnt, setTimeCnt] = useState([]);
    const [gender, setGender] = useState([]);
    const [genderArr, setGenderArr] = useState([]);

    const [ageArr, setAgeArr] = useState([]);
    const [ageCnt, setAgeCnt] = useState([]);

    const [cateArr, setCateArr] = useState([]);
    const [cateCnt, setCateCnt] = useState([]);

    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (localStorage.getItem('ownerToken')) {
            initialize();
        }
    }, []);

    const initialize = async () => {
        setLoading(true)
        const URLT = '/owner/getTime';
        const URLG = '/owner/getGender';
        const URLA = '/owner/getAge';
        const URLC = '/owner/getCategorySale';
        try {
            const reTime = await client.get(URLT);
            setTime(reTime.data.map((x: any) => x.tal + '시'));
            setTimeCnt(reTime.data.map((x: any) => x.sum));

            const reGender = await client.get(URLG);
            setGenderArr(reGender.data.map((x: any) => x.date));
            setGender(reGender.data.map((x: any) => x.sum));

            const reAge = await client.get(URLA);
            setAgeArr(reAge.data.map((x: any) => x.date));
            setAgeCnt(reAge.data.map((x: any) => x.sum));

            const reCate = await client.get(URLC);
            setCateArr(reCate.data.map((x: any) => x.date));
            setCateCnt(reCate.data.map((x: any) => x.sum));


            setTotal(reGender.data[0].sum + reGender.data[1].sum);


        } catch (e: any) {
            if (e.response.data.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});

            } else {
                fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            }
        }
        setLoading(false)
    }

    const option = {
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
        <OwnerMainDashF loading={loading} total={total} time={time} timeCnt={timeCnt} option={option}
                        genderArr={genderArr} gender={gender} ageArr={ageArr} ageCnt={ageCnt} cateArr={cateArr}
                        cateCnt={cateCnt}/>
    )
}
