import React from 'react';
import styled from "styled-components";

export default function OwnerMain() {

    const StyledDiv = styled.div`
      width: 80%;
      height: 400px;
      margin: auto;
      margin-top: 4rem;
      border: 1px solid black;
      padding: 1rem;
    `;

    return (
        <>
            <StyledDiv>
                업주 메인 페이지
            </StyledDiv>
        </>
    )
}
