import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "./modules/auth";
import {goodsReducer} from "./modules/goods";
import {cartReducer} from "./modules/cart";
import {CookiesProvider} from 'react-cookie';
import {userLocalMap} from "./modules/userLocalMap";
import {showLoginModal} from "./modules/showLoginModal";


const rootReducer = combineReducers({
    authReducer, goodsReducer, cartReducer, userLocalMap, showLoginModal,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(),
);

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.render(
    <BrowserRouter>
        <CookiesProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </CookiesProvider>
    </BrowserRouter>,
    document.getElementById('root')
);