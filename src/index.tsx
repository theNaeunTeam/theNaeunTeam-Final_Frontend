import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "./reducers/auth";

const rootReducer = combineReducers({
    authReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(),
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
