import React, {useEffect, useState} from 'react';
import {UncontrolledCarousel} from "reactstrap";
import styled from "styled-components";
import logo from '../../logo.svg';
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";

const DivContainer = styled.div`
  margin: 20px;
  padding: 100px;
`;

const DivCarouselContainer = styled.div`
  height: 500px;
  width: 700px;
  margin: auto;
`;

const DivRecommend = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-evenly;
`;

export default function UserMain() {

    const [arr, setArr] = useState<{src:string,altText:string,header:string}[]>([]);

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

    const history = useHistory();

    return (
        <DivContainer>
            <DivCarouselContainer>
                <UncontrolledCarousel items={arr}/>
            </DivCarouselContainer>
            <h2>추천</h2>
            <br/>
            <DivRecommend>
                <span>
                    <div style={{height: '200px', width: '200px'}}>
                        <img src={logo} onClick={() => history.push('/shopView/123')}/>
                        <br/>
                        가계명 :s
                        <br/>
                        원가 :
                        <br/>
                        할인가 :
                    </div>
                </span>
                <span>
                    <div style={{height: '200px', width: '200px'}}>
                        <img src={logo}/>
                        <br/>
                        가계명 :
                        <br/>
                        원가 :
                        <br/>
                        할인가 :
                    </div>
                </span>
                <span>
                    <div style={{height: '200px', width: '200px'}}>
                        <img src={logo}/>
                        <br/>
                        가계명 :
                        <br/>
                        원가 :
                        <br/>
                        할인가 :
                    </div>
                </span>
                <span>
                    <div style={{height: '200px', width: '200px'}}>
                        <img src={logo}/>
                        <br/>
                        가계명 :
                        <br/>
                        원가 :
                        <br/>
                        할인가 :
                    </div>
                </span>
            </DivRecommend>
        </DivContainer>
    )
}
