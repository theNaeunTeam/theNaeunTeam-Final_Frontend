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
  margin: 50px;
  padding: 10px;
  width: 100%;

`;

const DivNav = styled.div`
  width: 20%;
  font-size: large;

`;
const DivMain = styled.div`
  width: 70%;
  height: 100%;
`;
export default function OwnerDashS() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.push('/err');
    }, []);

    const value = {
        sum : 0 ,
        tal : 0,
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
            <DivNav>
                <OwnerNavbar/>
            </DivNav>
            <DivMain>
                <h3>기타</h3>
                <div> 노쇼 건수 : {noShow.sum} 건/ 발생 비율 {noShow.tal} %</div>
                <div> 취소 건수 : {cancel.sum}건 / 발생 비율 {cancel.tal} %</div>
                <div> 유통기한 경과 폐기 상품 : {over.sum} 개 / 발생 비율 {over.tal} %</div>
            </DivMain>
        </DivContainer>
    )
}
