import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserNavbar from "./UserNavbar";
import styled from "styled-components";

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

export default function UserMyPage(props: { loading: any; userData: any; }) {

    const {
        loading,
        userData,
    } = props;

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