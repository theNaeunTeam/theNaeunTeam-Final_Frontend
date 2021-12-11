import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import {carouselType} from "../../lib/types";
import {useHistory} from "react-router-dom";
import '../../lib/styles/ChangeBanner.scss';
import ChangeBanner from "../../components/Master/ChangeBanner";
import {useSweetAlert} from "../../lib/useSweetAlert";

const emptyValue = {
    src: '',
    altText: '',
    header: '',
    description: '',
    link: '',
};

export default function ChangeBannerContainer() {

    const {fireSweetAlert} = useSweetAlert();

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
            })
            .catch(err => {
                alert('페이지 초기화 실패');
            })
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const formData = new FormData()
        // @ts-ignore
        formData.append('file', e.target.files[0]);

        client.post('/master/bannerImage', formData)
            .then(res => {
                const cp = [...arr];
                cp[idx].src = res.data.res;
                setArr(cp);
            })
            .catch(err => {
                alert('이미지 등록 실패하는데 실패하였습니다.');
            })
    }

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>, idx: number) => {
        const tagName = (e.target as HTMLInputElement).name;
        const cp = [...arr];
        // @ts-ignore
        cp[idx][tagName] = (e.target as HTMLInputElement).value;
        setArr(cp);
    }

    const submitForm = () => {
        client.put('/master/bannerContents', arr)
            .then(res => {
                fireSweetAlert({title: '배너 업데이트 성공하였습니다.', icon: 'success'});
                history.push('/');
            })
            .catch(err => {
                alert('배너 업데이트 실패하였습니다.');
            })
    }

    return (
        <>
            <ChangeBanner arr={arr} handleFormChange={handleFormChange} handleFileChange={handleFileChange}
                          setArr={setArr} emptyValue={emptyValue} submitForm={submitForm}/>
        </>
    )
}
