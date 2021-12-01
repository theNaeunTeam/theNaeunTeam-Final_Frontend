import OwnerNavbar from "./OwnerNavbar";
import styled from "styled-components";
import {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {client} from "../../lib/api/client";
import {conType} from "../../modules/types";

const DivContainer = styled.div`
  border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 90%;
  clear: both;
`;
const LineDiv = styled.div`
  display: block;
  padding: 10px;
  border: solid;
  width: 20%;
  height: 50px;
  text-align: center;
  border: solid grey;
  margin-left: 10%;
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
            <h3>기타</h3>
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
        </DivContainer>
    )
}
