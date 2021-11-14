import React from "react";
import styled from "styled-components";

export default function Footer() {

    const DivFooter = styled.div`
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
    `

    return (
        <DivFooter>
            <hr/>
            <h1>Footer</h1>
        </DivFooter>
    )
}
