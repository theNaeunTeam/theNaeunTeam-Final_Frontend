import React from "react";
import styled from "styled-components";

const DivFooter = styled.div`
  bottom: 0;
  width: 100%;
  text-align: center;
`;

export default function Footer() {

    return (
        <DivFooter>
            <hr/>
            <h1>Footer</h1>
        </DivFooter>
    )
}
