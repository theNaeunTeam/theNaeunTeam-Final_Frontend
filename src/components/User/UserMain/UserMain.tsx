import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {A11y, Autoplay, Navigation, Pagination, Scrollbar} from "swiper";
import Item from "./Item";
import {Paper} from "@mui/material";
import LocalList from "./LocalList";
import {carouselType, recommendType, shopList} from "../../../lib/types";
import RecommendList from "./RecommendList";
import styled from "styled-components";

const DivContainer = styled.div`
  clear: both;
  margin: 20px;
  text-align: center;
  min-height: 100%;
  position: relative;
  padding-bottom: 19px;
`;

export default function UserMain(props: { loading: any; items: any; shopList: any; recommends: any; history: any; }) {

    const {
        loading,
        items,
        shopList,
        recommends,
        history,

    } = props;

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
                    autoplay={{delay: 5000}}
                >
                    {
                        items.map((data: carouselType, idx: number) => {
                            return (
                                <SwiperSlide key={`sw${idx}`}>
                                    <Item key={`item${idx}`} data={data} idx={idx}/>
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
                    shopList.map((data: shopList, idx: number) => <LocalList key={`l${idx}`} idx={idx} data={data}
                                                                             history={history}/>)
                    : null}
            </Paper>
            <h1 style={{fontFamily: 'Cafe24Oneprettynight'}}>최근 등록된 상품</h1>
            <br/>
            <Paper className='divRecommend'>
                {recommends.map((data: recommendType, idx: number) => <RecommendList key={`r${idx}`} idx={idx}
                                                                                     data={data}
                                                                                     history={history}/>)}
            </Paper>
        </DivContainer>
    )
}