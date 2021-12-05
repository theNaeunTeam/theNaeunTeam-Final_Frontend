import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {client} from "../../../lib/api/client";
import {useHistory} from 'react-router-dom';
import {useRouteMatch} from 'react-router';
import '../../../lib/styles/ShopStyle.scss';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";
import fullStar from "../../../lib/styles/images/star1.png";
import emptyStar from "../../../lib/styles/images/star2.png";
import Swal from 'sweetalert2';
import {categoryType, shopViewType} from "../../../lib/types";
import {fetch_Category_Per_sNumber} from "../../../lib/api/Fetch_Category_Per_sNumber";
import GoodsMode from "./GoodsMode";
import ShopDetail from "./ShopDetail";


const DivTitle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;


export default function ShopView() {

    const {authReducer} = useSelector((state: RootState) => state);
    const initialSelect = useRef(null);
    const dispatch = useDispatch();
    const initColor = {
        case1: true,
        case2: false,
        case3: false,
        case4: false,
        case5: false,
        case6: false,
        case7: false,
    };

    const initColor2 = {
        case1: false,
        case2: false,
        case3: false,
        case4: false,
        case5: false,
        case6: false,
        case7: false,
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
        cooked: 0,
        drink: 0,
        freeze: 0,
        fresh: 0,
        gagong: 0,
        other: 0,
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
    };

    const favorInit = {
        f_o_sNumber: '',
        f_p_user_id: ''
    };


    const history = useHistory();
    const [aboutStore, setAboutStore] = useState(initStore);
    const [modal, setModal] = useState(true);
    const [color, setColor] = useState(initColor);
    const [rows, setRows] = useState<shopViewType[]>(initGoods2);
    const [temp, setTemp] = useState<shopViewType[]>([]);
    const [category, setCategory] = useState<categoryType>({
        gagong: 0,
        other: 0,
        freeze: 0,
        cooked: 0,
        fresh: 0,
        drink: 0,
        g_owner: '',
    });

    //즐찾 state
    const [favorites, setFavorites] = useState(false);


    const categoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btnValue = (e.target as HTMLButtonElement).name; // button의 name값을 가져옴
        // @ts-ignore
        setColor({...initColor2, [btnValue]: !color[btnValue]});

        switch (btnValue) {
            case 'case1':
                setRows([...temp]);
                break;
            case 'case2':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '마실것')]);
                break;
            case 'case3':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '신선식품')]);
                break;
            case 'case4':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '가공식품')]);
                break;
            case 'case5':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '냉동식품')]);
                break;
            case 'case6':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '조리/반조리')]);
                break;
            case 'case7':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '식품외 기타')]);
                break
            default:
                break;
        }
    };

    interface ImatchParams {
        o_sNumber: string;
    }

    // 사업자번호 GET주소에서 match해오기
    const match = useRouteMatch<ImatchParams>();

    // 상품정보api
    const gooodsTableInit = async () => {

        fetch_Category_Per_sNumber(match.params.o_sNumber)
            .then(res => {
                setCategory(res);
            })
            .catch(err => {
                alert('카테고리 갯수 가져오기 실패');
                console.log(err);
            })

        const URL = '/common/storeGoodsView';

        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setRows(res.data);
            setTemp(JSON.parse(JSON.stringify(res.data)));
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    //가게정보 api
    const storeTableInit = async () => {

        const URL = '/common/storeView';
        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setAboutStore(res.data);
            console.log(res);
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

    function loginCheck() {
        Swal.fire({
            title: '로그인이 필요합니다.',
            text: "로그인페이지에서 로그인을 해주세요.",
            icon: 'warning',
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
            // alert('로그인필요');
            loginCheck();
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
            dispatch({type: true})
            return false;
        }
        const URL = '/user/FavorOff';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
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
        //@ts-ignore
        initialSelect.current.focus();
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
            dispatch({type: true});
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
                    removeCookie('cart', {path: '/'});
                    // return false;
                    cookieCart = [{
                        g_count: g_count,
                        g_code: g_code,
                        id: authReducer.u_id,
                        o_sNumber: match.params.o_sNumber
                    }];
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
                <h2 style={{fontSize: 'xxx-large', color: 'black'}}>{aboutStore.o_name}</h2>
                <h3 style={{color: 'gray', fontSize: 'x-large'}}>{aboutStore.o_time1} ~ {aboutStore.o_time2}</h3>
            </DivTitle>
            <hr/>
            <div className={"nav"}>
                <a className={"a"} href="javascript:void(0);" onClick={() => setModal(true)}
                   ref={initialSelect}
                >상품 정보</a>
                <a className={"a"} href="javascript:void(0);" onClick={() => {
                    setModal(false)
                }}>매장 정보</a>
            </div>
            {
                modal
                    ? <GoodsMode
                        color={color}
                        categoryChange={categoryChange}
                        category={category}
                        rows={rows}
                        saveGoods={saveGoods}
                    />
                    : <div className={'ShopViewDivContainerContainer'}>
                        <ShopDetail aboutStore={aboutStore}/>
                    </div>

            }
            <div style={{textAlign: 'center', marginBottom: '100px'}}>
                <button className='cartBtn' style={{width: '50%'}}
                        onClick={() => history.push('/user/shoppingcart')}>장바구니
                    보기
                </button>
            </div>
        </>
    );
};
