import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {client} from "../../../lib/api/client";
import {carouselType} from "../../../modules/types";
import {useHistory} from "react-router-dom";
import './ChangeBanner.css';
import {Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 10px;
  text-align: center;
  width: 70%;
  background-color: ghostwhite;
`;

const SpanRow = styled.span`
  display: inline-flex;
  flex-direction: column;
  border: solid #282c34 0.5px;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  align-items: center;
  width: 70%;
`

const emptyValue = {
    src: '',
    altText: '',
    header: '',
    description: '',
    link: '',
}

export default function ChangeBanner() {

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
            <DivContainer>
                {arr.map((data, idx) =>
                    <>
                        <form onSubmit={e => e.preventDefault()} onChange={e => handleFormChange(e, idx)}>
                            <SpanRow className={'SpanRow'}>
                                <strong> {idx + 1}번 배너 </strong>
                                <br/>
                                Header text<input type={"text"} defaultValue={data.header} id={`header${idx}`}
                                                name={'header'}/>
                                Image ALT text 설정<input type={'text'} defaultValue={data.altText} id={`altText${idx}`}
                                                    name={'altText'}/>
                                Description text 설정<input type={'text'} defaultValue={data.description}
                                               id={`description${idx}`}
                                               name={'description'}/>
                                Link href 설정<input type={"text"} defaultValue={data.link} id={`link${idx}`}
                                                 name={'link'}/>
                               이미지 파일 업로드 <input type={'file'} onChange={(e) => handleFileChange(e, idx)}/>
                                <input type={'hidden'} defaultValue={data.src} id={`src${idx}`} name={'src'}/>
                                <hr/>
                            </SpanRow>
                            <img src={data.src} height={'500px'} width={'100%'} alt={data.altText}/>
                            <hr/>
                            <Button variant={'contained'} color={'error'}
                                    style={{width: '50%', marginTop: '10px'}}
                                    onClick={() => {
                                        const cp = [...arr];
                                        cp.splice(idx, 1);
                                        setArr(cp);
                                    }}>해당 배너 삭제
                            </Button>
                        </form>
                    </>
                )}
                <br/>
                <div>
                    <Button variant={'contained'}
                            style={{width: '50%'}}
                            onClick={() => {
                                const cp = [...arr];
                                cp.push(emptyValue)
                                setArr(cp);
                            }}>배너 페이지 추가
                    </Button>
                    <br/><br/>
                    <Button
                        style={{width: '50%'}}
                        variant={'contained'} color={'success'} onClick={submitForm}>저장<SaveIcon/></Button>
                </div>
            </DivContainer>
        </>
    )
}
