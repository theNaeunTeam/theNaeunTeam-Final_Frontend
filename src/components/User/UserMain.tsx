import React, {useState} from 'react';
import {UncontrolledCarousel} from "reactstrap";
import styled from "styled-components";
import logo from '../../logo.svg';

export default function UserMain() {

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

    const defaultValue = [
        {
            src: 'https://s36537.pcdn.co/wp-content/uploads/2015/06/600px-iwo-longcat.jpg.webp',
            altText: '1번슬라이드 대체문구',
            header: '1번 슬라이드 제목',
        },
        {
            src: 'https://s36537.pcdn.co/wp-content/uploads/2015/06/600px-outer-space-longcat-6ztyxR.jpg.webp',
            altText: '2번슬라이드 대체문구',
            header: '2번 슬라이드 제목',
        },
    ];

    const [items, setItems] = useState(defaultValue);

    return (
        <DivContainer>
            <DivCarouselContainer>
                <UncontrolledCarousel items={items}/>
            </DivCarouselContainer>
            <h2>추천</h2>
            <br/>
            <DivRecommend>
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
