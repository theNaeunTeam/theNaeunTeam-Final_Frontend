import React, {useLayoutEffect} from 'react';

import {Route} from 'react-router-dom';
import LoginFormContainer from "./components/Common/LoginForm/LoginFormContainer";
import Header from "./components/Common/Header";
import MasterMain from "./components/Master/MasterMain";
import UserRegisterFormContainer from "./components/Common/UserReigisterForm/UserRegisterFormContainer";
import UserMain from "./components/User/UserMain/UserMain";
import ShopView from "./components/Common/ShopView/ShopView";
import Footer from "./components/Common/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./index";
import OwnerRegisterFormContainer from "./components/Common/OwnerRegisterForm/OwnerRegisterFormContainer";
import OwnerMain from "./components/Owner/OwnerMain";
import AddProduct from "./components/Owner/AddProduct";
import GoodsView from "./components/Owner/GoodsView";
import ReservationView from "./components/Owner/ReservationView";
import Unsubscribe from "./components/Owner/Unsubscribe";
import {client} from "./lib/api/client";
import ShoppingCart from "./components/User/ShoppingCart/ShoppingCart";
import PageNotFound from "./components/Common/PageNotFound";
import UserMypageContainer from "./components/User/UserMyPage/UserMypageContainer";
import OrderContainer from './components/User/Order/OrderContainer';
import UserReserve from "./components/User/UserReserve/UserReserve";
import FavorStoreContainer from "./components/User/FavorStore/FavorStoreContainer";
import UserEditContainer from "./components/User/UserEdit/UserEditContainer";
import UserExitContainer from "./components/User/UserExit/UserExitContainer";
import ShopListContainer from "./components/Common/ShopList/ShopListContainer";
import MasterNavbar from "./components/Master/MasterNavbar";
import MasterUserList from "./components/Master/MasterUserList";
import ApprovalWaiting from "./components/Master/ApprovalWaiting";
import ApprovalCompletion from "./components/Master/ApprovalCompletion";
import MasterOwnerDash from "./components/Master/MasterOwnerDash";
import TerminationWaiting from "./components/Master/TerminationWaiting";
import TerminationCompletion from "./components/Master/TerminationCompletion";
import ChangeBannerContainer from "./components/Master/ChangeBanner/ChangeBannerContainer";
import OwnerDashS from "./components/Owner/OwnerDashS";
import OwnerDashF from "./components/Owner/OwnerDashF";
import UserDash from "./components/Master/UserDash";
import MasterChart from "./components/Master/MasterChart";
import PrivacyPolicy from "./components/Common/PrivacyPolicy";
import FindpwContainer from "./components/Common/Findpw/FindpwContainer";
import MainBar from "./components/Common/MainBar";
import OwnerNavbar from "./components/Owner/OwnerNavbar";

function App() {

    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useLayoutEffect(() => { // 웹페이지 최초 접속 시 자동로그인 시도
        autoLogin();
    }, []);

    const autoLogin = () => {
        console.log('자동로그인시도');
        let URL = '';
        if (localStorage.getItem('userToken')) {
            URL = '/user/tokencheck';
            client.get(URL).then(() => {
                dispatch({
                    type: 'userMode', payload: localStorage.getItem('u_id')
                })
            }).catch(() => {
                localStorage.clear();
            })
        }
        if (localStorage.getItem('ownerToken')) {
            URL = '/owner/tokencheck';
            client.get(URL).then(() => {
                dispatch({
                    type: 'ownerMode',
                    payload: localStorage.getItem('o_sNumber')
                });
            }).catch(() => {
                localStorage.clear();
            })
        }
        if (localStorage.getItem('masterToken')) {
            URL = '/master/tokencheck';
            client.get(URL).then(() => {
                dispatch({
                    type: 'masterMode'
                })
            }).catch(() => {
                localStorage.clear();
            })
        }
        if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
            dispatch(
                {
                    type: 'getLocaled',
                    payload: {
                        lat: localStorage.getItem('lat'),
                        lon: localStorage.getItem('lon')
                    }
                })
        }
    };

    return (
        <div className='bodyWrapper'>
            <Header/>
            <div className='bodyContent'>
                {authReducer.isMaster === true ? <Route path='/' component={MasterNavbar}/>
                    : authReducer.isOwner === true ? <Route path='/' component={OwnerNavbar}/>
                        : <Route path='/' component={MainBar}/>}


                <Route path='/' exact component={UserMain}/>

                <Route exact path='/login' component={LoginFormContainer}/>

                <Route exact path='/user/register' component={UserRegisterFormContainer}/>

                <Route exact path='/owner/register' component={OwnerRegisterFormContainer}/>

                <Route exact path='/findpw/:id/:token' component={FindpwContainer}/>


                <Route path={'/master/changeBanner'} component={ChangeBannerContainer}/>

                <Route path='/shopView/:o_sNumber' component={ShopView}/>

                <Route path='/list' component={ShopListContainer}/>


                <Route path='/master' exact component={MasterMain}/>
                <Route path='/master/masteruserlist' component={MasterUserList}/>
                <Route path='/master/approvalwaiting' component={ApprovalWaiting}/>
                <Route path='/master/approvalcompletion' component={ApprovalCompletion}/>
                <Route path='/master/terminationwaiting' component={TerminationWaiting}/>
                <Route path='/master/terminationcompletion' component={TerminationCompletion}/>
                <Route path='/master/masterownerdash' component={MasterOwnerDash}/>
                <Route path='/master/userdash' component={UserDash}/>
                <Route path='/master/masterchart' component={MasterChart}/>


                {/*<Route path='/user' component={UserNavbar}/>*/}
                <Route path='/user' exact component={UserMypageContainer}/>
                <Route path='/user/shoppingcart' component={ShoppingCart}/>
                <Route path='/user/order' component={OrderContainer}/>
                <Route path='/user/userreserve' component={UserReserve}/>
                <Route path='/user/favorstore' component={FavorStoreContainer}/>
                <Route path='/user/useredit' component={UserEditContainer}/>
                <Route path='/user/userexit' component={UserExitContainer}/>


                {/*<Route path='/owner' component={OwnerNavbar}/>*/}
                <Route path='/owner' exact component={OwnerMain}/>
                <Route path='/owner/addproduct' component={AddProduct}/>
                <Route path='/owner/goodsview' component={GoodsView}/>
                <Route path='/owner/reservationview' component={ReservationView}/>
                <Route path='/owner/unsubscribe' component={Unsubscribe}/>
                <Route path='/owner/ownerdashf' component={OwnerDashF}/>
                <Route path='/owner/ownerdashs' component={OwnerDashS}/>


                <Route path={'/err'} component={PageNotFound}/>
                <Route path={'/PrivacyPolicy'} component={PrivacyPolicy}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
