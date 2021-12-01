import React, {useEffect, useState} from 'react';
import './UserMain.css';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {carouselType, recommendType} from "../../../modules/types";
import axios from "axios";
import RecommendList from "./RecommendList";
import {A11y, Autoplay, Navigation, Pagination, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react.js';
import {Link} from 'react-router-dom';

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/scrollbar/scrollbar.scss'; // ScrollBar module
import 'swiper/modules/autoplay/autoplay.scss'; // Autoplay module

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
  border: solid red;
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


    function Item({data, idx}: itemType) {
        return (
            <div>
                <Link to={data.link} style={{width:'100%'}}>
                    <div style={{
                        backgroundImage: `url(${data.src})`,
                        width: "100%",
                        height: "500px",
                        backgroundSize: '100% 500px',
                        color : 'black',
                    }}>
                        <h2>{data.header}</h2>
                        <p>{data.description}</p>
                        {/*<img src={data.src} alt={data.altText} height={'500px'} width={'100%'}/>*/}
                        {/*<Button variant="outlined" onClick={() => history.push(data.link)}>*/}
                        {/*    Check it out!*/}
                        {/*</Button>*/}
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <DivContainer>
            <DivCarouselContainer>
                {loading || <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{clickable: true}}
                    scrollbar={{draggable: true}}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    autoplay={{delay: 5000}}
                >
                    {
                        items.map((data, idx) => {
                            return (
                                <SwiperSlide>
                                    <Item key={idx} data={data} idx={idx}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
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
