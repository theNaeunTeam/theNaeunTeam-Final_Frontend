import React from "react";
import styled from "styled-components";

const DivFooter = styled.div`
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
  position: absolute;
  //border: solid darkblue;
  background: #b3d5f1;
  //background: linear-gradient(to bottom, white,#b3d5f1 80%);
`;

export default function Footer() {

    return (
        <DivFooter>
            <a href={'/PrivacyPolicy'} style={{color:"black" , textDecoration:'none'}}>개인정보처리방침</a>
        </DivFooter>
    )
}
