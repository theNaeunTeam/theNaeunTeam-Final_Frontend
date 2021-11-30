import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {Paper} from '@mui/material'
import {carouselType, recommendType} from "../../../modules/types";
import axios from "axios";
import RecommendList from "./RecommendList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './UserMain.css';

const DivContainer = styled.div`
  clear: both;
  margin: 20px;
  text-align: center;
  min-height: 100%;
  position: relative;
  padding-bottom: 19px;
`;

const DivCarouselContainer = styled.div`
  height: 600px;
  width: 100%;
  margin-bottom: 100px;
`;

const DivRecommend = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  height: 100%;
`;


export default function UserMain() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<carouselType[]>([]);
    const [recommends, setRecommends] = useState<recommendType[]>([]);
    const history = useHistory();


    useEffect(() => {
        fetchBanner();
        fetchRecommendList();
    }, []);

    const fetchBanner = () => {
        const URL = '/common/banner';
        axios.get(URL)
            .then(res => {
                setItems(res.data)
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                alert('페이지 초기화 실패');
            })
    }

    const fetchRecommendList = () => {
        const URL = '/common/recommendList';
        axios.get(URL)
            .then(res => {
                console.log(res.data);
                setRecommends(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }

    interface itemType {
        data: carouselType;
        idx: number;
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow:<ArrowForwardIcon/>,
        prevArrow:<ArrowBackIcon/>,
        adaptiveHeight:true,
        fade: true,
    };

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     className: "mainBanner",
    // };

    function Item({data, idx}: itemType) {
        return (
            <div>
                <div style={{
                    backgroundImage: `url(${data.src})`,
                    width: "100%",
                    height: "600px",
                    backgroundSize: "100% 600px",
                }}>
                    <h2>{data.header}</h2>
                    <p>{data.description}</p>
                    {/*<img src={data.src} alt={data.altText} height={'500px'} width={'100%'}/>*/}
                    {/*<Button variant="outlined" onClick={() => history.push(data.link)}>*/}
                    {/*    Check it out!*/}
                    {/*</Button>*/}
                </div>
            </div>
        )
    }


    return (
        <DivContainer>
            <DivCarouselContainer>
                {loading || <Slider {...settings}>

                    {
                        items.map((data, idx) => <Item key={idx} data={data} idx={idx}/>)
                    }
                </Slider>
                }
            </DivCarouselContainer>
            <h2>최근 등록된 상품</h2>
            <br/>
            <DivRecommend>
                {recommends.map((data: recommendType, idx) => <RecommendList key={`r${idx}`} idx={idx} data={data}
                                                                             history={history}/>)}
            </DivRecommend>
        </DivContainer>
    )
}
