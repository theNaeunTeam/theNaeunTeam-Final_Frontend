import React, {useEffect, useState} from 'react';
import './UserMain.css';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {carouselType, recommendType, shopList, shopViewType} from "../../../modules/types";
import axios from "axios";
import RecommendList from "./RecommendList";
import {A11y, Autoplay, Navigation, Pagination, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react.js';
import {Link} from 'react-router-dom';
import {Paper} from "@mui/material";


import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/scrollbar/scrollbar.scss'; // ScrollBar module
import 'swiper/modules/autoplay/autoplay.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../index";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop"; // Autoplay module

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
  //margin-bottom: 100px;
`;

const DivRecommend = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin-bottom: 50px;
  border: solid red;
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

    interface itemType {
        data: carouselType;
        idx: number;
    }


    function Item({data, idx}: itemType) {
        return (
            <div>
                <Link to={data.link} style={{width: '100%'}}>
                    <div style={{
                        backgroundImage: `url(${data.src})`,
                        width: "100%",
                        height: "500px",
                        backgroundSize: '100% 500px',
                        color: 'black',
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

    interface localProps {
        history: any,
        data: shopList,
        idx: number
    }

    function LocalList(props: localProps) {
        return (
            <>

                <span>
                    <div className='goodsSide'>

                        <img src={props.data.o_image}
                             onClick={() => props.history.push(`/shopView/${props.data.o_sNumber}`)}
                             style={{height: '77%', width: '70%', cursor: 'pointer'}}
                        />
                        <br/>
                        <b>{props.data.o_name}</b><br/>
                        {props.data.o_address}<br/>
                        {props.data.o_time1}~{props.data.o_time2}
                        <br/>
                    </div>
                </span>

            </>
        )
    }

    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
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
            <div>
                {shopList.length != 0 ?
                    <h1>근처 가게</h1>
                    : null
                }
                <Paper className='divRecommend'>
                    {shopList.length != 0 ?
                        shopList.map((data: shopList, idx) => <LocalList key={`l${idx}`} idx={idx} data={data}
                                                                         history={history}/>)
                        : null}
                </Paper>
            </div>
            <div>
                <h1>최근 등록된 상품</h1>
                <br/>
                <Paper className='divRecommend'>
                    {recommends.map((data: recommendType, idx) => <RecommendList key={`r${idx}`} idx={idx} data={data}
                                                                                 history={history}/>)}
                </Paper>
            </div>
        </DivContainer>
    )
}
