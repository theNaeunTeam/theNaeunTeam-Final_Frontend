import React, {useEffect} from 'react';

import {Route, Switch} from 'react-router-dom';
import LoginForm from "./components/Common/LoginForm";
import Header from "./components/Common/Header";
import MasterMain from "./components/Master/MasterMain";
import UserRegisterForm from "./components/User/UserRegisterForm";
import UserMain from "./components/User/UserMain";
import OwnerNavbar from "./components/Owner/OwnerNavbar";
import Footer from "./components/Common/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./index";
import OwnerRegisterForm from "./components/Owner/OwnerRegisterForm";
import OwnerMain from "./components/Owner/OwnerMain";
import AddProduct from "./components/Owner/AddProduct";
import GoodsView from "./components/Owner/GoodsView";
import ReservationView from "./components/Owner/ReservationView";
import SellingView from "./components/Owner/SellingView";
import Unsubscribe from "./components/Owner/Unsubscribe";
import {client} from "./lib/api/client";
import UserNavbar from "./components/User/UserNavbar";


function App() {

    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => { // 웹페이지 최초 접속 시 자동로그인 시도
        autoLogin();
    }, []);

    const autoLogin = () => {
        let URL = '/tokencomfirm';

        client.get(URL).then(() => {
            if (localStorage.getItem('userToken')) dispatch({
                type: 'userMode', payload: localStorage.getItem('u_id')
            });
            if (localStorage.getItem('ownerToken')) dispatch({
                type: 'ownerMode',
                payload: localStorage.getItem('o_sNumber')
            });
            if (localStorage.getItem('masterToken')) dispatch({
                type: 'masterMode'
            });
        })
            .catch(err => {
                // alert('자동로그인실패');
                console.log(err);
                localStorage.clear();
            })
    };

    return (
        <>
            <Header/>

            <Switch>
                <Route exact path='/' component={UserMain}/>

                <Route exact path='/master' component={MasterMain}/>

                <Route exact path='/login' component={LoginForm}/>

                <Route exact path='/user/register' component={UserRegisterForm}/>

                <Route exact path='/owner/register' component={OwnerRegisterForm}/>
            </Switch>

            {
                authReducer.isUser && ( // 유저로 로그인 된 상태에서만 접근 가능한 페이지
                    <>
                        <Route path='/user' component={UserNavbar}/>
                    </>
                )
            }

            {authReducer.isOwner && ( // 가게로 로그인 된 상태에서만 접근 가능한 페이지
                <>
                    <Route path='/owner' component={OwnerNavbar}/>
                    <Route path='/owner' exact component={OwnerMain}/>
                    <Route path='/owner/addproduct' component={AddProduct}/>
                    <Route path='/owner/goodsview' component={GoodsView}/>
                    <Route path='/owner/reservationview' component={ReservationView}/>
                    <Route path='/owner/sellingview' component={SellingView}/>
                    <Route path='/owner/unsubscribe' component={Unsubscribe}/>
                </>
            )}

            <Footer/>
        </>
    );
}

export default App;
