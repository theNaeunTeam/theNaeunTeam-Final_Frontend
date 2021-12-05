import React, {useEffect, useState} from 'react';
import './UserMain.scss';
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {carouselType, recommendType, shopList} from "../../../lib/types";
import axios from "axios";
import RecommendList from "./RecommendList";
import {A11y, Autoplay, Navigation, Pagination, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react.js';
import {Paper} from "@mui/material";

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/scrollbar/scrollbar.scss'; // ScrollBar module
import 'swiper/modules/autoplay/autoplay.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../index";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import LocalList from "./LocalList";
import Item from "./Item"; // Autoplay module


const DivContainer = styled.div`
  clear: both;
  margin: 20px;
  text-align: center;
  min-height: 100%;
  position: relative;
  padding-bottom: 19px;
`;


export default function UserMain() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<carouselType[]>([]);
    const [recommends, setRecommends] = useState<recommendType[]>([]);
    const history = useHistory();
    const {userLocalMap} = useSelector((state: RootState) => state);
    const [shopList, setShopList] = useState<shopList[]>([]);

    useEffect(() => {
        fetchBanner();
        fetchRecommendList();
        fetchLocalList();
    }, [userLocalMap]);

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
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const fetchLocalList = () => {
        if (userLocalMap.lat != 0 && userLocalMap.lon != 0) {
            axios.get('/common/localList?LAT=' + userLocalMap.lat + '&LON=' + userLocalMap.lon)
                .then(res => {
                    console.log(res.data);
                    setShopList(res.data);
                    console.log(shopList);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    console.log(shopList);
                })
        } else {
            console.log('위치 지정 안되어있음');
            console.log(shopList.length === 0);
            console.log(shopList);
        }
    }

    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className={'DivCarouselContainer'}>
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
            </div>
            {shopList.length != 0 ?
                <h1 style={{fontFamily: 'Cafe24Oneprettynight'}}>근처 가게</h1>
                : null
            }
            <Paper className='divRecommend'>
                {shopList.length != 0 ?
                    shopList.map((data: shopList, idx) => <LocalList key={`l${idx}`} idx={idx} data={data}
                                                                     history={history}/>)
                    : null}
            </Paper>
            <h1 style={{fontFamily: 'Cafe24Oneprettynight'}}>최근 등록된 상품</h1>
            <br/>
            <Paper className='divRecommend'>
                {recommends.map((data: recommendType, idx) => <RecommendList key={`r${idx}`} idx={idx} data={data}
                                                                             history={history}/>)}
            </Paper>
        </DivContainer>
    )
}

