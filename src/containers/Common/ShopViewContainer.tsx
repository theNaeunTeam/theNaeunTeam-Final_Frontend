import React, {useEffect, useRef, useState} from 'react';
import {client} from "../../lib/api/client";
import {useHistory} from 'react-router-dom';
import {useRouteMatch} from 'react-router';
import '../../lib/styles/ShopStyle.scss';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {aboutStoreType, categoryType, shopBtnColor, shopViewType} from "../../lib/types";
import {fetch_Category_Per_sNumber} from "../../lib/api/Fetch_Category_Per_sNumber";
import GoodsMode from "../../components/Common/ShopView/GoodsMode";
import ShopDetail from "../../components/Common/ShopView/ShopDetail";
import ShopView from "../../components/Common/ShopView/ShopView";
import {useSweetAlert} from "../../lib/useSweetAlert";

export default function ShopViewContainer() {

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

    const history = useHistory();
    const {fireSweetAlert} = useSweetAlert();
    const [aboutStore, setAboutStore] = useState<aboutStoreType>(initStore);
    const [modal, setModal] = useState(true);
    const [color, setColor] = useState<shopBtnColor>(initColor);
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
        type keys = keyof shopBtnColor;
        const btnValue = (e.target as HTMLButtonElement).name as keys; // button의 name값을 가져옴
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
                alert('카테고리 갯수 가져오기 실패하였습니다.');
            })

        const URL = '/common/storeGoodsView';

        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setRows(res.data);
            setTemp(JSON.parse(JSON.stringify(res.data)));
        } catch (e) {
        }
    };

    //가게정보 api
    const storeTableInit = async () => {

        const URL = '/common/storeView';
        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setAboutStore(res.data);
        } catch (e) {
        }
    }

    useEffect(() => {
        favorCheck();
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
        try {
            const res = await client.post(URL, data);

            setFavorites(res.data);
        } catch (e) {
        }
    }


    // 즐겨찾기 추가 api
    const favorInsert = async () => {
        if (!authReducer.isUser) {
            // fireSweetAlert({title: '로그인이 필요한 기능입니다', text: '먼저 로그인 해주세요', icon: 'warning'});
            dispatch({type: true});
            return false;
        }
        const URL = '/user/addFavor';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
            f_p_user_id: authReducer.u_id
        }
        try {
            const res = await client.post(URL, data);
            setFavorites(true);
            fireSweetAlert({title: '즐겨찾기에 추가되었습니다', text: '즐겨찾기에서 확인하실 수 있습니다.', icon: 'success'});
        } catch (e) {
        }
    }
    // 즐겨찾기 해제 api
    const favorOff = async () => {
        if (!authReducer.isUser) {
            // fireSweetAlert({title: '로그인이 필요한 기능입니다', text: '먼저 로그인 해주세요', icon: 'warning'});
            dispatch({type: true})
            return false;
        }
        const URL = '/user/FavorOff';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
        }
        try {
            const res = await client.post(URL, data);
            setFavorites(false);
            fireSweetAlert({title: '즐겨찾기에서 해제되었습니다', text: '즐겨찾기에서 확인하실 수 있습니다.', icon: 'success'});
        } catch (e) {
        }
    }

    // 정보 받아오는 함수 실행
    useEffect(() => {
        if (initialSelect.current) {
            (initialSelect.current as HTMLInputElement).focus();
        }
        gooodsTableInit();
        storeTableInit();
        window.scrollTo(0, 0);
    }, [])

    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    // 장바구니에 추가
    const saveGoods = (e: React.FormEvent<HTMLFormElement>, max: number) => {
        e.preventDefault();
        let cntOver = false;
        if (!e.target) return false;
        const g_count = Number((e.target as unknown as any[])[0].value);
        const g_code = Number((e.target as unknown as any[])[1].value);

        if (!authReducer.isUser) {
            // fireSweetAlert({title: '로그인이 필요한 기능입니다', text: '먼저 로그인 해주세요', icon: 'warning'});
            dispatch({type: true});
            return false;
        }

        let cookieCart: any = [];

        if (cookies.cart) { // 쿠키에 뭔가 있다
            cookieCart = [...cookies.cart];
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
                        cntOver = true;
                        // alert(`장바구니에 담을 수 있는 최대수량인 "${acc}개"로 조정되었습니다`);
                        fireSweetAlert({
                            title: '최대 수량을 초과했습니다',
                            text: `장바구니에 담을 수 있는 최대수량인 "${acc}개"로 조정되었습니다`,
                            icon: 'info'
                        });
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
            cookieCart.push({
                g_count: g_count,
                g_code: g_code,
                id: authReducer.u_id,
                o_sNumber: match.params.o_sNumber
            });
        }
        setCookie('cart', cookieCart, {path: '/'});
        // if (window.confirm('장바구니로 이동하시겠습니까?')) {
        //     history.push('/user/shoppingcart');
        // }
        if (!cntOver) fireSweetAlert({title: '장바구니에 추가되었습니다', icon: 'success'});
    };

    return (
        <>
            <ShopView favorites={favorites} favorOff={favorOff} favorInsert={favorInsert} aboutStore={aboutStore}
                      setModal={setModal} initialSelect={initialSelect} topic={match.params.o_sNumber}/>
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
                        <ShopDetail aboutStore={aboutStore} fireSweetAlert={fireSweetAlert}/>
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
