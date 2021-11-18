import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {client} from "../../lib/api/client";
import {useHistory} from 'react-router-dom';
import {useRouteMatch} from 'react-router';
import './ShopStyle.css';
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {useCookies} from 'react-cookie';
import {useSelector} from "react-redux";
import {RootState} from "../../index";

export default function ShopView() {
    const history = useHistory();
    const {authReducer} = useSelector((state: RootState) => state);
    const DivTitle = styled.div`
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px;
    `;

    const DivButton = styled.div`
      margin: 5px;
      padding: 0;
      display: flex;
      list-style: none;
      justify-content: space-around;
    `;

    const DivContainer = styled.div`
      display: flex;
      justify-content: space-evenly;
      margin: 50px;
      padding: 10px;
      width: 100%;
    `;

    const DivHalfMenu = styled.div`
      flex: 1;
      margin: 10px;
      padding: 10px;
      width: 40%;
    `;

    let nav = {
        height: 100,

    }

    const initColor = {
        case1: true,
        case2: false,
        case3: false,
        case4: false
    };

    const initColor2 = {
        case1: false,
        case2: false,
        case3: false,
        case4: false
    };

    const initialValue = {
        title: 'CU 센텀클래스원점',
        total: '200000원',
        daily: '200원',
        monthly: '2000원',
        goods: '360개',
        reserved: '15개',
        lat: 33.5563,
        lng: 126.79581,
    };

    const [AboutStore, setAboutStore] = useState(initialValue);

    type tableType = {
        g_owner: string,
        g_code: number,
        g_name: string,
        g_count: number,
        g_price: number,
        g_discount: number,
        g_detail: string,
        g_image: string,
        g_expireDate: string,
        g_status: number,
        g_category: string,
    };
    // 배열에 객체로

    const initGoods2 = [{
        g_owner: '',
        g_code: 0,
        g_name: '',
        g_count: 0,
        g_price: 0,
        g_discount: 0,
        g_detail: '',
        g_image: '',
        g_expireDate: '',
        g_status: 0,
        g_category: '',
    }];

    const [modal, setModal] = useState(true);

    const [color, setColor] = useState(initColor);

    const [rows, setRows] = useState<tableType[]>(initGoods2);

    const change = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btnValue = (e.target as HTMLButtonElement).name; // button의 name값을 가져옴
        // @ts-ignore
        setColor({...initColor2, [btnValue]: !color[btnValue]});
    };

    interface ImatchParams {
        o_sNumber: string;
    }

    // 사업자번호 GET주소에서 match해오기
    const match = useRouteMatch<ImatchParams>();

    React.useEffect(() => {
        // 마운트 될 때 number값 출력
        console.log(match.params);
    }, [])

    // 상품정보api
    const gooodsTableInit = async () => {

        const URL = '/user/storeGoodsView';

        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            console.log(res);
            console.log(match.params.o_sNumber + '1');

            setRows(res.data);
        } catch (e) {
            console.log(e);
        }
    };
    //가게정보
    const storeTableInit = async () => {

        const URL = '';
        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            console.log(res);
            console.log(match.params.o_sNumber + '2');
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        gooodsTableInit();
        storeTableInit();
    }, [])

    const [cookies, setCookie] = useCookies(['cart']);

    // 장바구니에 추가
    const saveGoods = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!authReducer.isUser) {
            alert('로그인이 필요한 기능입니다.');
            return false;
        }
        const cookieCart = [{ // 수량 입력창 필요
            g_code: (e.target as HTMLButtonElement).name,
            id: authReducer.u_id,
            g_count: 0,
        },]
        setCookie('cart', JSON.stringify(cookieCart), {path: '/'});
        if (window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?')) {
            history.push('/user/shoppingcart');
        }
    };

    const TableBuilder = (props: { data: tableType, idx: number }) => {
        return (
            <>
                <DivContainer>
                    <DivHalfMenu>
                        <br/>
                        <h3>{props.data.g_name}</h3>
                        <h6>{props.data.g_expireDate}</h6>
                        <br/>
                        <h5 style={{textDecorationLine: 'line-through'}}>정상가 : {props.data.g_price}</h5>
                        <h5>할인가 : {props.data.g_discount}</h5>
                        <h6>남은 수량 : {props.data.g_count}</h6><br/>
                        {/*//@ts-ignore*/}
                        <Button name={props.data.g_code} style={{background: 'gray'}} variant="contained"
                                onClick={e => saveGoods(e)}>장바구니 담기 </Button>
                    </DivHalfMenu>
                    <DivHalfMenu>
                        <img style={{maxWidth: '100%'}} src={props.data.g_image}/>
                    </DivHalfMenu>
                </DivContainer>
            </>
        )
    }

    //상품정보
    function AAA() {
        return (
            <>
                <DivButton>
                    <Button name='case1' style={color.case1 ? {background: 'red'} : undefined} variant="contained"
                            onClick={(e) => change(e)}>전체</Button>
                    <Button name='case2' style={color.case2 ? {background: 'red'} : undefined} variant="contained"
                            onClick={change}>카페/음료</Button>
                    <Button name='case3' style={color.case3 ? {background: 'red'} : undefined} variant="contained"
                            onClick={change}>스낵</Button>
                    <Button name='case4' style={color.case4 ? {background: 'red'} : undefined} variant="contained"
                            onClick={change}>냉동/빙과류</Button>
                </DivButton>

                {rows.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}

                <DivContainer>
                    <Button style={{background: 'red', width: '100%'}} variant="contained"
                            onClick={() => history.push('/user/shoppingcart')}>장바구니
                        보기 </Button>
                </DivContainer>
            </>
        )
    }

    //매장정보
    function BBB() {
        return (
            <>
                <DivContainer>
                    <DivHalfMenu>
                        <h3>가게정보 </h3><br/>
                        <h5>영업시간 </h5><br/>
                        <h5>휴무일 </h5>
                    </DivHalfMenu>
                    <DivHalfMenu>
                        <Map
                            center={{lat: AboutStore.lat, lng: AboutStore.lng}}
                            style={{width: "100%", height: "360px"}}
                        >
                            <MapMarker position={{lat: AboutStore.lat, lng: AboutStore.lng}}>
                                <div style={{color: "#000"}}>{AboutStore.title}</div>
                            </MapMarker>
                        </Map>
                    </DivHalfMenu>
                </DivContainer>
            </>
        )
    }


    return (
        <>
            <DivTitle>
                <h3>CU 센텀클래스원점</h3>
                <h6>(영업시간 읽어오기)</h6>
            </DivTitle>
            <hr/>
            <nav>
                <a href="javascript:void(0);" onClick={() => {
                    setModal(true)
                }}>상품정보</a>
                <a href="javascript:void(0);" onClick={() => {
                    setModal(false)
                }}>매장정보</a>
            </nav>


            {
                modal === true
                    ? <AAA/>
                    : <BBB/>
            }


        </>
    );
};
