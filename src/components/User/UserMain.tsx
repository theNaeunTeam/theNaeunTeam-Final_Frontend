import React from 'react';
import {useDispatch, useSelector} from "react-redux";

export default function UserMain() {

    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const test = () => {
        dispatch({type: 'test', payload: 'adsfsdaf'});
        console.log(store);
    };

    return (
        <>
            <h1>유저 메인 페이지</h1>
            <div>
            </div>
            <button onClick={test}>리듀서 테스트</button>
        </>
    )
}
