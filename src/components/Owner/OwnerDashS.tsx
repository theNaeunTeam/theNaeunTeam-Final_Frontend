import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const DivContainer = styled.div`
  //border: solid black;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 97%;
  clear: both;
  text-align: center;
`;
const LineDiv = styled.div`
  display: block;
  padding-top: 25px;
  border: solid;
  width: 30%;
  height: 100px;
  text-align: center;
  border: solid grey;
  margin-left: 10%;
  border-radius: 10px;
`;
const DivContent = styled.div`
  //border: solid red;
  display: inline-flex;
  width: 100%;
  margin-top: 25px;

`;

export default function OwnerDashS(props: { loading: any; noShow: any; over: any; cancel: any }) {
    const {
        loading,
        noShow,
        over,
        cancel,
    } = props;
    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <h1>기타</h1>
            <DivContent>
                <LineDiv>
                    <b>노쇼 발생 </b>{noShow.sum} 건 <br/>
                    <b>발생 비율</b> {noShow.tal} %</LineDiv>
                <LineDiv>
                    <b>취소 발생 </b> {cancel.sum}건 <br/>
                    <b>발생 비율 </b>{cancel.tal} %</LineDiv>
                <LineDiv>
                    <b>유통기한 경과 폐기 상품 </b>{over.sum} 개 <br/>
                    <b>발생 비율 </b> {over.tal} %
                </LineDiv>
            </DivContent>
        </DivContainer>
    )
}