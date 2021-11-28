import React, {useLayoutEffect} from 'react';

import {Route, Switch} from 'react-router-dom';
import LoginForm from "./components/Common/LoginForm";
import Header from "./components/Common/Header";
import MasterMain from "./components/Master/MasterMain";
import UserRegisterForm from "./components/Common/UserRegisterForm";
import UserMain from "./components/User/UserMain/UserMain";
import ShopView from "./components/Common/ShopView";
import Footer from "./components/Common/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./index";
import OwnerRegisterForm from "./components/Common/OwnerRegisterForm";
import OwnerMain from "./components/Owner/OwnerMain";
import AddProduct from "./components/Owner/AddProduct";
import GoodsView from "./components/Owner/GoodsView";
import ReservationView from "./components/Owner/ReservationView";
import Unsubscribe from "./components/Owner/Unsubscribe";
import {client} from "./lib/api/client";
import UserNavbar from "./components/User/UserNavbar";
import ShoppingCart from "./components/User/ShoppingCart";
import PageNotFound from "./components/Common/PageNotFound";
import UserMypage from "./components/User/UserMypage";
import Order from './components/User/Order';
import UserReserve from "./components/User/UserReserve";
import FavorStore from "./components/User/FavorStore";
import UserEdit from "./components/User/UserEdit";
import UserExit from "./components/User/UserExit";
import ShopList from "./components/Common/ShopList/ShopList";
import MasterNavbar from "./components/Master/MasterNavbar";
import MasterUserList from "./components/Master/MasterUserList";
import ApprovalWaiting from "./components/Master/ApprovalWaiting";
import ApprovalCompletion from "./components/Master/ApprovalCompletion";
import MasterOwnerDash from "./components/Master/MasterOwnerDash";
import TerminationWaiting from "./components/Master/TerminationWaiting";
import TerminationCompletion from "./components/Master/TerminationCompletion";
import ChangeBanner from "./components/Master/ChangeBanner";
import OwnerDashS from "./components/Owner/OwnerDashS";
import OwnerDashF from "./components/Owner/OwnerDashF";
import UserDash from "./components/Master/UserDash";
import MasterChart from "./components/Master/MasterChart";
import PrivacyPolicy from "./components/Common/PrivacyPolicy";

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
    };

    return (
        <>
            <Header/>

            <Switch>
                <Route exact path='/' component={UserMain}/>

                <Route exact path='/login' component={LoginForm}/>

                <Route exact path='/user/register' component={UserRegisterForm}/>

                <Route exact path='/owner/register' component={OwnerRegisterForm}/>

            </Switch>

            <Route path={'/master/changeBanner'} component={ChangeBanner}/>

            <Route path='/shopView/:o_sNumber' component={ShopView}/>

            <Route path='/list' component={ShopList}/>

            <Route path='/master' component={MasterNavbar}/>
            <Route path='/master' exact component={MasterMain}/>
            <Route path='/master/masteruserlist' component={MasterUserList}/>
            <Route path='/master/approvalwaiting' component={ApprovalWaiting}/>
            <Route path='/master/approvalcompletion' component={ApprovalCompletion}/>
            <Route path='/master/terminationwaiting' component={TerminationWaiting}/>
            <Route path='/master/terminationcompletion' component={TerminationCompletion}/>
            <Route path='/master/masterownerdash' component={MasterOwnerDash}/>
            <Route path='/master/userdash' component={UserDash}/>
            <Route path='/master/masterchart' component={MasterChart}/>


            <Route path='/user' component={UserNavbar}/>
            <Route path='/user' exact component={UserMypage}/>
            <Route path='/user/shoppingcart' component={ShoppingCart}/>
            <Route path='/user/order' component={Order}/>
            <Route path='/user/userreserve' component={UserReserve}/>
            <Route path='/user/favorstore' component={FavorStore}/>
            <Route path='/user/useredit' component={UserEdit}/>
            <Route path='/user/userexit' component={UserExit}/>


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
            <Footer/>
        </>
    );
}

export default App;
