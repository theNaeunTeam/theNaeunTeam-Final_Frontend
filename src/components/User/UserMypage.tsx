import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {userMyPageType} from "../../modules/types";


const DivContainer = styled.div`
  border: solid black;
  display: flex;
  justify-content: center;
  margin: 50px;
  padding: 10px;
`;

const DivHalfMenu = styled.div`
  flex: 1;
  margin: 10px;
  padding: 10px;
`;

export default function UserMypage() {
    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!authReducer.isUser) history.push('/err');
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
            <DivHalfMenu>
                <h3>{userData.u_id}님은 지구를 {userData.save} 번 구하셨습니다.</h3>
                <h5>지구를 구할 계획 : {userData.reserve} </h5>
                <h5>포인트 : {userData.u_point}</h5>
            </DivHalfMenu>
        </DivContainer>
    )
}
