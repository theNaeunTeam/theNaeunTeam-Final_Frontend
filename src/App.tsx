import React, {useLayoutEffect} from 'react';

import {Route} from 'react-router-dom';
import LoginFormContainer from "./containers/Common/LoginFormContainer";
import Header from "./components/Common/Header";
import MasterMainContainer from "./containers/Master/MasterMainContainer";
import UserRegisterFormContainer from "./containers/Common/UserRegisterFormContainer";
import UserMainContainer from "./containers/User/UserMainContainer";
import ShopViewContainer from "./containers/User/ShopViewContainer";
import Footer from "./components/Common/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./index";
import OwnerRegisterFormContainer from "./containers/Common/OwnerRegisterFormContainer";
import OwnerMainContainer from "./containers/Owner/OwnerMainContainer";
import AddProductContainer from "./containers/Owner/AddProductContainer";
import GoodsViewContainer from "./containers/Owner/GoodsViewContainer";
import ReservationViewContainer from "./containers/Owner/ReservationViewContainer";
import UnsubscribeContainer from "./containers/Owner/UnsubscribeContainer";
import {client} from "./lib/api/client";
import ShoppingCartContainer from "./containers/User/ShoppingCartContainer";
import PageNotFound from "./components/Common/PageNotFound";
import UserMypageContainer from "./containers/User/UserMypageContainer";
import OrderContainer from './containers/User/OrderContainer';
import UserReserveContainer from "./containers/User/UserReserveContainer";
import FavorStoreContainer from "./containers/User/FavorStoreContainer";
import UserEditContainer from "./containers/User/UserEditContainer";
import UserExitContainer from "./containers/User/UserExitContainer";
import ShopListContainer from "./containers/Common/ShopListContainer";
import MasterNavbar from "./components/Master/MasterNavbar";
import MasterUserListContainer from "./containers/Master/MasterUserListContainer";
import ApprovalWaitingContainer from "./containers/Master/ApprovalWaitingContainer";
import ApprovalCompletionContainer from "./containers/Master/ApprovalCompletionContainer";
import MasterOwnerDashContainer from "./containers/Master/MasterOwnerDashContainer";
import TerminationWaitingContainer from "./containers/Master/TerminationWaitingContainer";
import TerminationCompletionContainer from "./containers/Master/TerminationCompletionContainer";
import ChangeBannerContainer from "./containers/Master/ChangeBannerContainer";
import OwnerDashSContainer from "./containers/Owner/OwnerDashSContainer";
import OwnerDashFContainer from "./containers/Owner/OwnerDashFContainer";
import UserDashContainer from "./containers/Master/UserDashContainer";
import MasterChartContainer from "./containers/Master/MasterChartContainer";
import PrivacyPolicy from "./components/Common/PrivacyPolicy";
import FindpwContainer from "./containers/Common/FindpwContainer";
import MainBar from "./components/Common/MainBar";
import OwnerNavbar from "./components/Owner/OwnerNavbar";
import MyCompany from "./components/Common/MyCompany";

function App() {

    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useLayoutEffect(() => { // 웹페이지 최초 접속 시 자동로그인 시도
        autoLogin();
    }, []);

    const autoLogin = () => {
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


                <Route path='/' exact component={UserMainContainer}/>

                <Route exact path='/login' component={LoginFormContainer}/>

                <Route exact path='/user/register' component={UserRegisterFormContainer}/>

                <Route exact path='/owner/register' component={OwnerRegisterFormContainer}/>

                <Route exact path='/findpw/:id/:token' component={FindpwContainer}/>

                <Route exact path='/mycompany' component={MyCompany}/>
                <Route path={'/master/changeBanner'} component={ChangeBannerContainer}/>

                <Route path='/shopView/:o_sNumber' component={ShopViewContainer}/>

                <Route path='/list' component={ShopListContainer}/>


                <Route path='/master' exact component={MasterMainContainer}/>
                <Route path='/master/masteruserlist' component={MasterUserListContainer}/>
                <Route path='/master/approvalwaiting' component={ApprovalWaitingContainer}/>
                <Route path='/master/approvalcompletion' component={ApprovalCompletionContainer}/>
                <Route path='/master/terminationwaiting' component={TerminationWaitingContainer}/>
                <Route path='/master/terminationcompletion' component={TerminationCompletionContainer}/>
                <Route path='/master/masterownerdash' component={MasterOwnerDashContainer}/>
                <Route path='/master/userdash' component={UserDashContainer}/>
                <Route path='/master/masterchart' component={MasterChartContainer}/>


                {/*<Route path='/user' component={UserNavbar}/>*/}
                <Route path='/user' exact component={UserMypageContainer}/>
                <Route path='/user/shoppingcart' component={ShoppingCartContainer}/>
                <Route path='/user/order' component={OrderContainer}/>
                <Route path='/user/userreserve' component={UserReserveContainer}/>
                <Route path='/user/favorstore' component={FavorStoreContainer}/>
                <Route path='/user/useredit' component={UserEditContainer}/>
                <Route path='/user/userexit' component={UserExitContainer}/>


                {/*<Route path='/owner' component={OwnerNavbar}/>*/}
                <Route path='/owner' exact component={OwnerMainContainer}/>
                <Route path='/owner/addproduct' component={AddProductContainer}/>
                <Route path='/owner/goodsview' component={GoodsViewContainer}/>
                <Route path='/owner/reservationview' component={ReservationViewContainer}/>
                <Route path='/owner/unsubscribe' component={UnsubscribeContainer}/>
                <Route path='/owner/ownerdashf' component={OwnerDashFContainer}/>
                <Route path='/owner/ownerdashs' component={OwnerDashSContainer}/>


                <Route path={'/err'} component={PageNotFound}/>
                <Route path={'/PrivacyPolicy'} component={PrivacyPolicy}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
