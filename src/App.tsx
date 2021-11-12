import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch ,Route } from 'react-router-dom';
import LoginForm from "./components/Common/LoginForm";
import Header from "./components/Common/Header";
import OwnerMain from "./components/Owner/OwnerMain";
import MasterMain from "./components/Master/MasterMain";
import UserRegisterForm from "./components/User/UserRegisterForm";

function App() {
    return (
        <>
            <Header/>
            <Switch>
                <Route path='/login' component={LoginForm} />
                <Route path='/owner' component={OwnerMain} />
                <Route path='/master' component={MasterMain} />
                <Route path='/register' component={UserRegisterForm} />
            </Switch>
        </>
    );
}

export default App;
