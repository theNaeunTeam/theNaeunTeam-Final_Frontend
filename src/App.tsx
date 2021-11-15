import React from 'react';

import {Route} from 'react-router-dom';
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


function App() {

    const {authReducer} = useSelector((state: RootState) => state);

    return (
        <>
            <Header/>
            <Route exact path='/master' component={MasterMain}/>

            <Route path='/login' component={LoginForm}/>

            <Route exact path='/' component={UserMain}/>
            <Route path='/user/register' component={UserRegisterForm}/>

            {authReducer.isOwner ? (
                    <>
                        <Route path='/owner' component={OwnerNavbar}/>
                        <Route exact path='/owner' component={OwnerMain}/>
                        <Route path='/owner/register' component={OwnerRegisterForm}/>
                        <Route path='/owner/addproduct' component={AddProduct}/>
                        <Route path='/owner/goodsview' component={GoodsView}/>
                        <Route path='/owner/reservationview' component={ReservationView}/>
                        <Route path='/owner/sellingview' component={SellingView}/>
                        <Route path='/owner/unsubscribe' component={Unsubscribe}/>
                    </>
                )
                :
                null
            }

            <Footer/>
        </>
    );
}

export default App;
