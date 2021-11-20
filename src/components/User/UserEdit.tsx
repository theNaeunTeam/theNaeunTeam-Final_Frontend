import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";

export default function UserEdit() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!authReducer.isUser) history.push('/err');
    }, []);

    const TableStyled = styled.table`
      padding: 30px;
      margin: auto;
      width: 80%;
    `;

    const DivContainer = styled.div`
      text-align: center;
    `;


    return (
        <DivContainer>

            <h2>회원정보수정</h2>
        </DivContainer>
    )
}
