import OwnerNavbar from "./OwnerNavbar";
import styled from "styled-components";
import {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {conType} from "../../modules/types";

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
  width: 20%;
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

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URL = '/owner/getOwnerBoard';

        try {
            const res = await client.get(URL);
            console.log(res);
            console.log(res.data.a);
            setNoShow(res.data.a);
            setCancel(res.data.b);
            setOver(res.data.c);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <DivContainer>
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
