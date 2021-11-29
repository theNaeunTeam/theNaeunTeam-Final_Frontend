import React from "react";
import styled from "styled-components";

const DivFooter = styled.div`
  bottom: 0;
  width: 100%;
  text-align: center;
  position: absolute;
`;

export default function Footer() {

    return (
        <DivFooter>
            <a href={'/PrivacyPolicy'}>개인정보처리방침</a>
        </DivFooter>
    )
}
