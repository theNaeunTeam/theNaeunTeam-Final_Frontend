import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {userMyPageType} from "../../modules/types";
import UserNavbar from "./UserNavbar";

const DivContainer = styled.div`
  //border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;


const DivNav = styled.div`
  //border: solid blue;
  width: 17%;
  font-size: 20px;
`;
const DivMain = styled.div`
  margin-top: 50px;
  border: solid red;
  width: 80%;
  height: 100%;
  padding: 50px 70px;
  min-height: 800px;
  margin-right: 15%;


`;
export default function UserMypage() {
    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')){
            alert('로그인 후 이용가능합니다.');
            history.replace('/login');
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
                <div className='subjectContent'>{userData.u_id}님은 지구를 {userData.save} 번 구하셨습니다.</div>
                <div className='smallSubject'>지구를 구하는 중 : {userData.reserve} </div>
                <div className='smallSubject'>포인트 : {userData.u_point}</div>
            </DivMain>
        </DivContainer>
    )
}
