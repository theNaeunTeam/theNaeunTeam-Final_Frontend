import React, {useEffect} from 'react';

import {Route} from 'react-router-dom';
import LoginForm from "./components/Common/LoginForm";
import Header from "./components/Common/Header";
import OwnerMain from "./components/Owner/OwnerMain";
import MasterMain from "./components/Master/MasterMain";
import UserRegisterForm from "./components/User/UserRegisterForm";
import OwnerRegisterForm from "./components/Owner/OwnerRegisterForm";
import UserMain from "./components/User/UserMain";
import OwnerHeader from "./components/Owner/OwnerHeader";
import AddProduct from "./components/Owner/AddProduct";
import ProductView from "./components/Owner/ProductView";
import ReservationView from "./components/Owner/ReservationView";
import SellingView from "./components/Owner/SellingView";
import Unsubscribe from "./components/Owner/Unsubscribe";


function App() {


    return (
        <>
            {/*<Switch>*/}
            <Route path={'/'} component={Header}/>
            <Route path={'/'} component={OwnerHeader}/>
            <Route path='/login' component={LoginForm}/>
            <Route path='/user' component={UserMain}/>
            <Route path='/owner' component={OwnerMain}/>
            <Route path='/master' component={MasterMain}/>
            <Route path='/userRegister' component={UserRegisterForm}/>
            <Route path='/ownerRegister' component={OwnerRegisterForm}/>
            <Route path={'/addproduct'} component={AddProduct}/>
            <Route path={'/productview'} component={ProductView}/>
            <Route path={'/reservationview'} component={ReservationView}/>
            <Route path={'/sellingview'} component={SellingView}/>
            <Route path={'/unsubscribe'} component={Unsubscribe}/>
            {/*</Switch>*/}
        </>
    );
}

export default App;
