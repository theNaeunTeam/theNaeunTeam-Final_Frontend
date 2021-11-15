import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";

export default function ShopView() {

    const DivTitle = styled.div`
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px;
    `;

    const DivButton = styled.div`
      margin: 5px;
      padding: 0;
      display: flex;
      list-style: none;
      justify-content: space-around;
    `;



    const initColor = {
        case1:false,
        case2:false,
        case3:false,
        case4:false
    };

    const [currentClick, setCurrentClick] = useState('');
    const [color, setColor] = useState(initColor);

    const ButtonColor = useRef('');

    // const GetClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     setCurrentClick((e.target as HTMLButtonElement).id);
    //     // console.log(currentClick);
    // };

    // useEffect(
    //     () => {
    //     if (currentClick !== null) {
    //         // let current = document.getElementById(currentClick);
    //         let current = ButtonColor;
    //         console.log(current);
    //         // if(current!==null)current.style.color = "black";
    //     }},[c
    const change = (e: React.MouseEvent<HTMLButtonElement>)=>{
        const btnValue = (e.target as HTMLButtonElement).name;
        // @ts-ignore
        setColor({...initColor, [btnValue]:!color[btnValue]});

    };

    return (
        <>
            <DivTitle>
                <h3 >CU 센텀클래스원점</h3>
                (영업시간 읽어오기)
            </DivTitle>
            <hr/>
            <DivTitle>
                상품정보
            </DivTitle>

            <DivButton>
            <Button name='case1' style={color.case1 ? {background:'red'} : undefined} variant="contained" onClick={e=>change(e)}>전체</Button>
            <Button name='case2' style={color.case2 ? {background:'red'} : undefined} variant="contained" onClick={e=>change(e)}>카페/음료</Button>
            <Button name='case3' style={color.case3 ? {background:'red'} : undefined} variant="contained" onClick={e=>change(e)}>스낵</Button>
            <Button name='case4' style={color.case4 ? {background:'red'} : undefined} variant="contained" onClick={e=>change(e)}>냉동/빙과류</Button>
            </DivButton>

        </>
    );
};