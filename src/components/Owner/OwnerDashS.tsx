import styled from "styled-components";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {conType} from "../../lib/types";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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
export default function OwnerDashS() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const value = {
        sum: 0,
        tal: 0,
    }
    const [noShow, setNoShow] = useState<conType>(value);
    const [cancel, setCancel] = useState<conType>(value);
    const [over, setOver] = useState<conType>(value);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('ownerToken')) {
            initialize();
        }
    }, []);

    const initialize = async () => {

        const URL = '/owner/getOwnerBoard';

        try {
            const res = await client.get(URL);

            setNoShow(res.data.a);
            setCancel(res.data.b);
            setOver(res.data.c);

        } catch (e: any) {
            if (e.response.data.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.');

            } else {
                alert('데이터를 가져오는 중 문제가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')
            }

        }
        setLoading(false)
    }

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
