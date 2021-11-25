import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import logo from '../../logo.svg';
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import Carousel from 'react-material-ui-carousel'
import {Button, Paper} from '@mui/material'
import {carouselType} from "../../modules/types";

const DivContainer = styled.div`
  margin: 20px;
  text-align: center;
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
`;


export default function UserMain() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<carouselType[]>([]);
    const history = useHistory();


    useEffect(() => {
        const URL = '/common/banner';
        client.get(URL)
            .then(res => {
                setItems(res.data)
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                alert('페이지 초기화 실패');
            })
    }, [])


    interface itemType {
        data: carouselType;
        idx: number;
    }

    function Item({data, idx}: itemType) {
        return (
            <Paper>
                <h2>{data.header}</h2>
                <p>{data.description}</p>
                <img src={data.src} alt={data.altText} height={'500px'} width={'100%'}/>
                <Button variant="outlined" onClick={() => history.push(data.link)}>
                    Check it out!
                </Button>
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
            <h2>추천</h2>
            <br/>
            <DivRecommend>
                <span>
                    <div style={{height: '200px', width: '200px'}}>
                        <img src={logo} onClick={() => history.push('/shopView/123')}/>
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
