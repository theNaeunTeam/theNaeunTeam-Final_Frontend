import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {userMyPageType} from "../../modules/types";
import UserNavbar from "./UserNavbar";

const DivContainer = styled.div`
  border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;


const DivNav = styled.div`
  border: solid blue;
  width: 17%;
  font-size: large;
`;
const DivMain = styled.div`
  border: solid red;
  width: 80%;
  height: 100%;
  padding: 20px;
`;
export default function UserMypage() {

    const {showLoginModal} = useSelector((state: RootState) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')){
            alert('로그인 후 이용가능합니다.');
            dispatch({type: true});
        }
    }, []);


    const initialValue = {
        u_id: '',
        save: 0,
        u_point: 0,
        reserve: 0,
    };

    const [userData, setUserData] = useState<userMyPageType>(initialValue);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URL = '/user/myPage';
        try {
            const res = await client.get(URL);
            setUserData(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <DivContainer>
            <DivNav>
                <UserNavbar />
            </DivNav>
            <DivMain>
                <h3>{userData.u_id}님은 지구를 {userData.save} 번 구하셨습니다.</h3>
                <h5>지구를 구하는 중 : {userData.reserve} </h5>
                <h5>포인트 : {userData.u_point}</h5>
            </DivMain>
        </DivContainer>
    )
}
