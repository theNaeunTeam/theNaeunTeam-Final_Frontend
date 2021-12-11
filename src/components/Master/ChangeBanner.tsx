import React from 'react';
import styled from "styled-components";
import {carouselType} from "../../lib/types";
import '../../lib/styles/ChangeBanner.scss';
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

export default function ChangeBanner(props: { arr: any; handleFormChange: any; handleFileChange: any; setArr: any; emptyValue: any; submitForm: any; }) {

    //비구조화 할당
    const {
        arr,
        handleFormChange,
        handleFileChange,
        setArr,
        emptyValue,
        submitForm
    } = props;


    return (
        <>
            <DivContainer>
                {/*배열갯수만큼 반복 */}
                {arr.map((data: carouselType, idx: number) =>
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
                            onClick={() => { // 버튼을 누르면 바로 실행
                                const cp = [...arr]; // 스테이트 딥카피
                                cp.push(emptyValue); // 비어있는 값을 푸시
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
