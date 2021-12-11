import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserNavbar from "./UserNavbar";
import styled from "styled-components";
import earth from "./../../lib/images/earth.jpg";
import {Paper} from "@mui/material";

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
  padding: 50px 0px;
  min-height: 1000px;
  //margin-right: 15%;
  display: inline-flex;
  justify-content: center;
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
                <Paper style={{width: '40%', margin: '17% 5% 40%', textAlign: 'center', paddingTop: '20px'}}>
                    <div className='subjectContent'><span style={{color: 'orange'}}>{userData.u_id}</span> 님은
                        지구를 <span style={{fontSize: 'xxx-large', color: 'blue'}}>{userData.save}번</span> 구하셨습니다.
                    </div>
                    <div className='smallSubject'>지구를 구하는 중 : {userData.reserve} </div>
                    <div style={{color: 'blue'}} className='smallSubject'>포인트 : {userData.u_point}</div>
                </Paper>

                <div style={{
                    width: '800px',
                    marginTop: '-50px',
                    marginBottom: '-50px',
                    marginLeft: '-50px'
                }}>
                    <img style={{width: '100%', height: '960px', borderRadius: '20px'}} src={earth}/>
                </div>
            </DivMain>
        </DivContainer>
    )
}