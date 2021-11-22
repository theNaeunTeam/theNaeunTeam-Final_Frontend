import React, {FormEvent, useEffect, useState} from 'react';
import styled from "styled-components";
import {client} from "../../lib/api/client";

const DivContainer = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  padding: 10px;
`;

const emptyValue = {
    src: '',
    altText: '',
    header: '',
}

export default function ChangeBanner() {

    const [arr, setArr] = useState<{src:string,altText:string,header:string}[]>([]);

    useEffect(() => {
        const URL = '/master/banner';
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

        <form method="post" encType="multipart/form-data" onSubmit={submitForm}>
            <DivContainer>
                {arr.map((data, idx) =>
                    <DivContainer>
                        <strong> {idx + 1}번 슬라이더 </strong>
                        <input type={"text"} value={data.header} id={'header'} name={'header'}/>
                        <input type={'text'} value={data.altText} id={'header'} name={'header'}/>
                        <input type={'hidden'} value={data.src} id={'src'} name={'src'}/>
                        <input type={'file'} aria-label={data.src}/>
                        <img src={data.src}/>
                        <button onClick={() => {
                            const cp = [...arr];
                            cp.splice(idx, 1);
                            setArr(cp);
                        }}>배너 삭제
                        </button>
                        <hr/>
                    </DivContainer>
                )}
                <br/>
                <button onClick={() => setArr([...arr, emptyValue])}>배너 추가</button>
            </DivContainer>
            <button>전송하기</button>
        </form>

    )
}