import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import {Button, Paper} from '@mui/material'
import {carouselType, recommendType} from "../../../modules/types";
import axios from "axios";
import RecommendList from "./RecommendList";

const DivContainer = styled.div`
  clear:both;
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
  text-align: center;
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

    function Item({data, idx}: itemType) {
        return (
            <Paper>
                <div style={{
                    backgroundImage: `url(${data.src})`,
                    width : "100%",
                    height : "600px",
                    backgroundSize : "100% 600px"
                }}>
                    <h2>{data.header}</h2>
                    <p>{data.description}</p>
                    {/*<img src={data.src} alt={data.altText} height={'500px'} width={'100%'}/>*/}
                    {/*<Button variant="outlined" onClick={() => history.push(data.link)}>*/}
                    {/*    Check it out!*/}
                    {/*</Button>*/}
                </div>
            </Paper>
        )
    }


    return (
        <DivContainer>
            <DivCarouselContainer>
                {loading || <Carousel
                    // IndicatorIcon={<Home/>}
                    indicatorIconButtonProps={{
                        style: {
                            padding: '10px',    // 1
                            color: 'gray'       // 3
                        }
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            backgroundColor: 'lightgray' // 2
                        }
                    }}
                    indicatorContainerProps={{
                        style: {
                            marginTop: '10px', // 5
                            textAlign: 'center' // 4
                        }
                    }}
                    navButtonsAlwaysVisible={true}
                >
                    {
                        items.map((data, idx) => <Item key={idx} data={data} idx={idx}/>)
                    }
                </Carousel>
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
