import React, {FormEvent, useEffect, useState} from 'react';
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {carouselType} from "../../modules/types";

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
    }, [])

    const submitForm = async (e: FormEvent) => {
        const URL = '/master/banner'
        // e.preventDefault();
        // console.log(e);
        // try {
        //     const res = await client.post(URL, formData);
        //     alert('등록성공');
        //     console.log(res);
        // } catch (e) {
        //     alert('실패');
        //     console.log(e);
        // }
    }

    return (

        <form action={'/common/banner'} method="post" encType="multipart/form-data" onSubmit={submitForm}>
            <DivContainer>
                {arr.map((data, idx) =>
                    <DivContainer>

                        <SpanContainer>
                            <SpanContainer>
                                <SpanRow>
                                    <strong> {idx + 1}번 배너 </strong>
                                    header<input type={"text"} value={data.header} id={'header'} name={'header'}/>
                                    <br/>
                                    altText<input type={'text'} value={data.altText} id={'altText'} name={'altText'}/>
                                    <br/>
                                    description<input type={'text'} value={data.description} id={'description'}
                                                      name={'description'}/>
                                    <br/>
                                    link<input type={"text"} value={data.link} id={'link'} name={'link'}/>
                                    <br/>
                                    <input type={'file'}/>
                                    <input type={'hidden'} value={data.src} id={'src'} name={'src'}/>
                                    <br/><br/><br/>
                                    <button onClick={() => {
                                        const cp = [...arr];
                                        cp.splice(idx, 1);
                                        setArr(cp);
                                    }}>배너 삭제
                                    </button>
                                </SpanRow>
                            </SpanContainer>
                            <img src={data.src}/>
                        </SpanContainer>

                    </DivContainer>
                )}
                <br/>
                <button onClick={() => setArr([...arr, emptyValue])}>배너 추가</button>
            </DivContainer>
            <button>전송하기</button>
        </form>

    )
}
