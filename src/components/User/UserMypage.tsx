import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {userMyPageType} from "../../modules/types";
import UserNavbar from "./UserNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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
  //border: solid red;
  width: 80%;
  height: 100%;
  padding: 50px 70px;
  min-height: 800px;
  margin-right: 15%;


`;
export default function UserMypage() {

    const {showLoginModal} = useSelector((state: RootState) => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) {
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
        if (localStorage.getItem('userToken')) {
            initialize();
        }

    }, []);

    const initialize = async () => {
        setLoading(true);
        const URL = '/user/myPage';
        try {
            const res = await client.get(URL);
            setUserData(res.data);
        } catch (e: any) {
            console.log(e.response);
            if (e.response.status === 500) {
                alert("서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.");
                history.push('/');

            } else if (e.response.status === 400) {
                alert(e.response.data);
                history.goBack();

            } else {
                alert('데이터를 불러오는데 실패했습니다. \n잠시 후 다시 시도 바랍니다.')
                history.goBack();

            }
            console.log(e);
        }
        setLoading(false);
    }
    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DivNav>
                <UserNavbar/>
            </DivNav>
            <DivMain>
                <div className='subjectContent'>{userData.u_id}님은 지구를 {userData.save} 번 구하셨습니다.</div>
                <div className='smallSubject'>지구를 구하는 중 : {userData.reserve} </div>
                <div className='smallSubject'>포인트 : {userData.u_point}</div>
            </DivMain>
        </DivContainer>
    )
}
