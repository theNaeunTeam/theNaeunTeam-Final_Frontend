import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {client} from "../../lib/api/client";
import {useHistory} from 'react-router-dom';
import {useRouteMatch} from 'react-router';
import '../../styles/ShopStyle.css';
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {useCookies} from 'react-cookie';
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import fullStar from "../../styles/images/star1.png";
import emptyStar from "../../styles/images/star2.png";
import Swal from 'sweetalert2';

export default function ShopView() {

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

    type goodsTableType = {
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

    const initStore = {
        o_sNumber: '',
        o_approval: 0,
        o_pw: '',
        token: '',
        o_phone: '',
        o_name: '',
        o_cellPhone: "",
        o_address: "",
        o_latitude: '',
        o_longitude: '',
        o_date: '',
        o_time1: "",
        o_time2: '',
        o_image: "",
    }

    const favorInit = {
        f_o_sNumber: '',
        f_p_user_id: ''
    };


    const history = useHistory();

    const [aboutStore, setAboutStore] = useState(initStore);

    const [modal, setModal] = useState(true);

    const [color, setColor] = useState(initColor);

    const [rows, setRows] = useState<goodsTableType[]>(initGoods2);

    //즐찾 state
    const [favorites, setFavorites] = useState(false);

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

    // 상품정보api
    const gooodsTableInit = async () => {

        const URL = '/user/storeGoodsView';

        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setRows(res.data);
        } catch (e) {
            console.log(e);
        }
    };
    //가게정보 api
    const storeTableInit = async () => {

        const URL = '/user/storeView';
        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setAboutStore(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        favorCheck();
        console.log(authReducer.isUser);
    }, [authReducer.isUser])

    // 즐겨찾기 유무 api
    const favorCheck = async () => {
        if (!authReducer.isUser) {
            return false;
        }
        const URL = '/user/favorCheck';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
            f_p_user_id: authReducer.u_id
        }
        console.log(data);
        try {
            const res = await client.post(URL, data);
            console.log('즐겨찾기 체크:' + res.data);
            console.log(typeof (res.data));
            setFavorites(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    function favoron() {
        Swal.fire({
            title: '즐겨찾기에 추가되었습니다',
            text: "즐겨찾기에서 확인하실 수 있습니다.",
            icon: 'success',
            // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            // cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                //"삭제" 버튼을 눌렀을 때 작업할 내용을 이곳에 넣어주면 된다.
            }
        })
    }

    function favoroff() {
        Swal.fire({
            title: '즐겨찾기에서 해제되었습니다',
            text: "즐겨찾기에서 확인하실 수 있습니다.",
            icon: 'success',
            // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            // cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                //"삭제" 버튼을 눌렀을 때 작업할 내용을 이곳에 넣어주면 된다.
            }
        })
    }

    // 즐겨찾기 추가 api
    const favorInsert = async () => {
        if (!authReducer.isUser) {
            return false;
        }
        const URL = '/user/addFavor';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
            f_p_user_id: authReducer.u_id

        }
        console.log('즐겨찾기 추가' + data);
        try {
            const res = await client.post(URL, data);
            console.log(res.data);
            // alert('즐겨찾기에 추가되었습니다.')
            setFavorites(true);
            favoron();
        } catch (e) {
            console.log(e);
        }
    }
    // 즐겨찾기 해제 api
    const favorOff = async () => {
        if (!authReducer.isUser) {
            alert('로그인이 필요한 기능입니다.');
            return false;
        }
        const URL = '/user/FavorOff';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
            f_p_user_id: authReducer.u_id
        }
        console.log('즐겨찾기 해제' + data);
        try {
            const res = await client.post(URL, data);
            console.log(res.data);
            // alert('즐겨찾기가 해제되었습니다.')
            setFavorites(false);
            favoroff();
        } catch (e) {
            console.log(e);
        }
    }

    // 정보 받아오는 함수 실행
    useEffect(() => {
        gooodsTableInit();
        storeTableInit();
        window.scrollTo(0, 0);
    }, [])

    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    // 장바구니에 추가
    const saveGoods = (e: React.FormEvent<HTMLFormElement>, max: number) => {
        e.preventDefault();

        // @ts-ignore
        const g_count = Number(e.target[0].value);
        // @ts-ignore
        const g_code = Number(e.target[1].value);

        if (!authReducer.isUser) {
            alert('로그인이 필요한 기능입니다.');
            return false;
        }

        let cookieCart: any = [];

        if (cookies.cart) { // 쿠키에 뭔가 있다
            cookieCart = [...cookies.cart];
            // if (Array.isArray(cookies.cart)) { // 배열인가?
            //     if (cookies.cart.length === 0) { // 빈 배열인가?
            //         console.log('쿠키가 빈 배열이다');
            //         cookieCart.push({
            //             g_count: g_count,
            //             g_code: g_code,
            //             id: authReducer.u_id,
            //             o_sNumber: match.params.o_sNumber
            //         });
            //         setCookie('cart', cookieCart, {path: '/'});
            //         if (window.confirm('장바구니로 이동하시겠습니까?')) {
            //             history.push('/user/shoppingcart');
            //         }
            //         return false;
            //     }
            // }

            console.log(cookieCart);

            const findDiffOwner = cookieCart.filter((x: any) => x.o_sNumber != match.params.o_sNumber);

            if (findDiffOwner.length !== 0) { // 파라메타의 사업자번호와 다른 사업자번호를 가진 쿠기가 있을 경우
                if (window.confirm('장바구니에 다른 가게의 상품이 담겨있습니다. 삭제하시겠습니까?')) {
                    removeCookie('cart');
                } else {
                    return false;
                }
            } else {

                const findSameGoods = cookieCart.findIndex((x: any) => x.g_code == g_code);

                if (findSameGoods !== -1) { // 이미 같은 상품이 쿠키에 저장되어 있을 경우

                    let acc = g_count + Number(cookieCart[findSameGoods].g_count);
                    if (acc > max) {
                        acc = max;
                        alert(`장바구니에 담을 수 있는 최대수량인 "${acc}개"로 조정되었습니다`);
                    }
                    cookieCart[findSameGoods] = {
                        g_count: acc,
                        g_code: g_code,
                        id: authReducer.u_id,
                        o_sNumber: match.params.o_sNumber
                    }
                } else {
                    cookieCart.push({
                        g_count: g_count,
                        g_code: g_code,
                        id: authReducer.u_id,
                        o_sNumber: match.params.o_sNumber
                    });
                }
            }
        } else {
            console.log('저장된 쿠키 없어서 새로 만듦');
            cookieCart.push({
                g_count: g_count,
                g_code: g_code,
                id: authReducer.u_id,
                o_sNumber: match.params.o_sNumber
            });
        }
        console.log(cookieCart);
        setCookie('cart', cookieCart, {path: '/'});
        if (window.confirm('장바구니로 이동하시겠습니까?')) {
            history.push('/user/shoppingcart');
        }
    };

    const optionTagBuilder = (g_count: number): JSX.Element[] => {
        const res = [];
        for (let i = 1; i <= g_count; i++) {
            res.push(<option value={i} key={i}>{i}개</option>);
        }
        return res;
    }

    // 상품정보
    const TableBuilder = (props: { data: goodsTableType, idx: number }) => {
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

                        수량 선택 :
                        <form onSubmit={event => saveGoods(event, props.data.g_count)}>
                            <select>
                                {optionTagBuilder(props.data.g_count).map(data => data)}
                            </select>
                            <input type={'hidden'} value={props.data.g_code}/>

                            <button style={{background: 'gray'}}>장바구니 담기</button>
                        </form>

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
                        <h3>가게정보 {aboutStore.o_name}</h3><br/>
                        {aboutStore.o_image}
                        <h5>가게 전화번호 {aboutStore.o_phone}</h5><br/>
                        <h5>영업시간 {aboutStore.o_time1} ~ {aboutStore.o_time2}</h5><br/>
                        <h5>휴무일 {}</h5>
                    </DivHalfMenu>
                    <DivHalfMenu>
                        <Map
                            center={{lat: Number(aboutStore.o_latitude), lng: Number(aboutStore.o_longitude)}}
                            style={{width: "100%", height: "360px"}}
                        >
                            <MapMarker
                                position={{lat: Number(aboutStore.o_latitude), lng: Number(aboutStore.o_longitude)}}>
                                <div style={{color: "#000"}}>{aboutStore.o_name}</div>
                            </MapMarker>
                        </Map>
                    </DivHalfMenu>
                </DivContainer>
                <h4 style={{display: "flex", justifyContent: "center"}}>주소 {aboutStore.o_address}</h4>


                <DivContainer>
                    <Button style={{background: 'red', width: '100%'}} variant="contained" onClick={() => {
                        history.push('')
                    }}>장바구니 보기 </Button>
                </DivContainer>
            </>
        )
    }


    return (
        <>
            <DivTitle>

                {
                    favorites
                        //    즐겨찾기 해제
                        ? <span style={{marginLeft: "auto"}}><img style={{width: "40px"}} src={fullStar}
                                                                  onClick={favorOff}/></span>
                        //    즐겨찾기 추가
                        : <span style={{marginLeft: "auto"}}><img style={{width: "40px"}} src={emptyStar}
                                                                  onClick={favorInsert}/></span>
                }

                <h3>CU 센텀클래스원점</h3>
                <h6 style={{color: 'gray'}}>{aboutStore.o_time1} ~ {aboutStore.o_time2}</h6>
            </DivTitle>
            <hr/>
            <div className={"nav"}>
                <a className={"a"} href="javascript:void(0);" onClick={() => {
                    setModal(true)
                }}>상품정보</a>
                <a className={"a"} href="javascript:void(0);" onClick={() => {
                    setModal(false)
                }}>매장정보</a>
            </div>


            {
                modal
                    ? <AAA/>
                    : <BBB/>
            }


        </>
    );
};
