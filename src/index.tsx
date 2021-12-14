import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
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
import {notificationReducer} from "./modules/notificaion";


const rootReducer = combineReducers({
    authReducer, goodsReducer, cartReducer, userLocalMap, showLoginModal,notificationReducer
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
