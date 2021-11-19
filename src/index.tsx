import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "./reducers/auth";
import {goodsReducer} from "./reducers/goods";
import {cartReducer} from "./reducers/cart";
import {CookiesProvider} from 'react-cookie';

const rootReducer = combineReducers({
    authReducer, goodsReducer, cartReducer
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

reportWebVitals();
