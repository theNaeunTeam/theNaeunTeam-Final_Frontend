import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../../lib/api/client";
import {carouselType} from "../../../lib/types";
import {useHistory} from "react-router-dom";
import './ChangeBanner.scss';
import ChangeBanner from "./ChangeBanner";

const emptyValue = {
    src: '',
    altText: '',
    header: '',
    description: '',
    link: '',
}

export default function ChangeBannerContainer() {

    const [arr, setArr] = useState<carouselType[]>([]);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('masterToken')) history.replace('/err');
    }, []);
    useEffect(() => {
        const URL = '/common/banner';
        client.get(URL)
            .then(res => {
                setArr(res.data)
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert('페이지 초기화 실패');
            })
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const formData = new FormData()
        // @ts-ignore
        formData.append('file', e.target.files[0]);

        client.post('/master/bannerImage', formData)
            .then(res => {
                console.log(res.data);
                const cp = [...arr];
                cp[idx].src = res.data.res;
                setArr(cp);
            })
            .catch(err => {
                console.log(err);
                alert('이미지 등록 실패하는데 실패하였습니다.');
            })
    }

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>, idx: number) => {
        const tagId = (e.target as HTMLInputElement).id;
        const tagName = (e.target as HTMLInputElement).name;
        const cp = [...arr];
        // @ts-ignore
        cp[idx][tagName] = (e.target as HTMLInputElement).value;
        setArr(cp);
        console.log(arr);
    }

    const submitForm = () => {
        console.log('서버로 보내는 배열 : ', arr);

        client.put('/master/bannerContents', arr)
            .then(res => {
                alert('배너 업데이트 성공하였습니다.')
                history.push('/');
            })
            .catch(err => {
                alert('배너 업데이트 실패하였습니다.');
                console.log(err);
            })
    }

    return (
        <>
            <ChangeBanner arr={arr} handleFormChange={handleFormChange} handleFileChange={handleFileChange}
                          setArr={setArr} emptyValue={emptyValue} submitForm={submitForm}/>
        </>
    )
}
