import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {carouselType} from "../../modules/types";
import {useHistory} from "react-router-dom";

const DivContainer = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  padding: 10px;
  text-align: center;
`;
const SpanContainer = styled.span`
  display: flex;
  align-items: center;
`;
const SpanRow = styled.span`
  display: flex;
  flex-direction: column;
  border: solid #282c34;
  margin: 10px;
  padding: 10px;
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
        if (!localStorage.getItem('masterToken')) history.push('/err');
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
                alert('이미지 등록 실패');
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
                alert('배너 업데이트 성공')
                history.push('/');
            })
            .catch(err => {
                alert('배너 업데이트 실패');
                console.log(err);
            })
    }
    return (
        <>
            <DivContainer>
                {arr.map((data, idx) =>
                    <>
                        <form onSubmit={e => e.preventDefault()} onChange={e => handleFormChange(e, idx)}>
                            <SpanRow>
                                <strong> {idx + 1}번 배너 </strong>
                                header<input type={"text"} defaultValue={data.header} id={`header${idx}`}
                                             name={'header'}/>
                                <br/>
                                altText<input type={'text'} defaultValue={data.altText} id={`altText${idx}`}
                                              name={'altText'}/>
                                <br/>
                                description<input type={'text'} defaultValue={data.description}
                                                  id={`description${idx}`}
                                                  name={'description'}/>
                                <br/>
                                link<input type={"text"} defaultValue={data.link} id={`link${idx}`} name={'link'}/>
                                <br/>
                                <input type={'file'} onChange={(e) => handleFileChange(e, idx)}/>
                                <input type={'hidden'} defaultValue={data.src} id={`src${idx}`} name={'src'}/>
                            </SpanRow>
                            <img src={data.src} height={'500px'} width={'100%'} alt={data.altText}/>
                            <button onClick={() => {
                                const cp = [...arr];
                                cp.splice(idx, 1);
                                setArr(cp);
                            }}>배너 삭제
                            </button>
                        </form>
                        <hr/>
                    </>
                )}
                <br/>
                <button onClick={() => {
                    const cp = [...arr];
                    cp.push(emptyValue)
                    setArr(cp);
                }}>배너 추가
                </button>
            </DivContainer>
            <button onClick={submitForm}>전송하기</button>
        </>
    )
}
