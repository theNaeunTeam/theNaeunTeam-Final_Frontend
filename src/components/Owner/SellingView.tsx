import React, {useLayoutEffect} from 'react';
import styled from "styled-components";
import OwnerNavbar from "./OwnerNavbar";
import {useHistory} from "react-router-dom";

const DivNav = styled.div`
  width: 20%;
  font-size: large;

`;
const DivMain = styled.div`
  width: 70%;
  height: 100%;
`;
const DivContainer = styled.div`
  display: inline-flex;
  width: 100%;
  margin: 50px;
  padding: 10px;
`;

export default function SellingView() {
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.push('/err');
    }, []);
    return (
        <DivContainer>
            <DivNav>
                <OwnerNavbar/>
            </DivNav>

            <DivMain>
                <h1>판매현황</h1>
            </DivMain>
        </DivContainer>
    )
}
