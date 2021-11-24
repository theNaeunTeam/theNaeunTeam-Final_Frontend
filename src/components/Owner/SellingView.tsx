import React from 'react';
import styled from "styled-components";
import OwnerNavbar from "./OwnerNavbar";

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
