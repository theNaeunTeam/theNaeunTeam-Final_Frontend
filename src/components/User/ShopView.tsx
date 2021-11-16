import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {client} from "../../lib/api/client";
import { RouteComponentProps } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

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
        case1:true,
        case2:false,
        case3:false,
        case4:false
    };
    const initColor2 = {
        case1:false,
        case2:false,
        case3:false,
        case4:false
    };

    const initGoods1 = {
        g_name:'친환경)CU백색봉투대',
        g_price:'100',
        g_discount:'100',
    };

    type tableType = {
        id:string,
        g_owner:string,
        g_code:number,
        g_name:string,
        g_count:number,
        g_price:number,
        g_discount:number,
        g_detail:string,
        g_image:string,
        g_expireDate:string,
        g_status:number,
        g_category:string,
    };

    // 배열에 객체로
    const initGoods2 = [{
        id:'',
        g_owner:'',
        g_code:0,
        g_name:'',
        g_count:0,
        g_price:0,
        g_discount:0,
        g_detail:'',
        g_image:'',
        g_expireDate:'',
        g_status:0,
        g_category:'',
    }];

    const DivContainer = styled.div`
      //border: solid black;
      display: flex;
      justify-content: space-evenly;
      margin: 50px;
      padding: 10px;
    `;

    const DivHalfMenu = styled.div`
      flex: 1;
      margin: 10px;
      padding: 10px;
    `;



    const [color, setColor] = useState(initColor);
    const [goods, setGoods] = useState(initGoods1);

    // const [goods2, setGoods2] = useState(initGoods2);
    const [rows, setRows] = useState<tableType[]>(initGoods2);

    const change = (e: React.MouseEvent<HTMLButtonElement>)=>{
        const btnValue = (e.target as HTMLButtonElement).name; // button의 name값을 가져옴
        // @ts-ignore
        setColor({...initColor2, [btnValue]:!color[btnValue]});

    };

    interface ImatchParams {
        number: string;
    }

    const match = useRouteMatch<ImatchParams>();

    React.useEffect(() => {
        // 마운트 될 때 number값 출력
        console.log(`number값: ${match.params.number}`);
    }, [])


    const storeTableInit = async () => {

            const URL = '/user/shopView';

            try {
                const res = await client.get(URL);

                // 받아온 결과에 id값 추가
                const massage = res.data.reduce((acc: tableType[], val: tableType) => {
                    acc.push({
                        ...val, id: val.g_owner
                    })
                    return acc;
                }, []);

                console.log(massage);

                setRows(massage);
            } catch (e) {
                console.log(e);
            }
    };

    // useEffect( ()=>{
    //     storeTableInit();
    // },[])


    // 장바구니에 추가
    const submitForm = async ()=>{
        const URL = ''
        const formData = new FormData();

        //유저 아이디에 추가
        formData.append('g_name', goods.g_name);
        formData.append('g_price', goods.g_price);
        formData.append('g_discount', goods.g_discount);
        
        const updateDB= async ()=>{
            try{
                const res = await client.post(URL,formData)
            } catch(e){
                console.log(e);
            }
        };
    };

    return (
        <>
            <DivTitle>
                <h3 >CU 센텀클래스원점</h3>
                <h6>(영업시간 읽어오기)</h6>
            </DivTitle>
            <hr/>
            <DivTitle>
                상품정보
            </DivTitle>

            <DivButton>
            <Button name='case1' style={color.case1 ? {background:'red'} : undefined} variant="contained" onClick={(e)=>change(e)}>전체</Button>
            <Button name='case2' style={color.case2 ? {background:'red'} : undefined} variant="contained" onClick={change}>카페/음료</Button>
            <Button name='case3' style={color.case3 ? {background:'red'} : undefined} variant="contained" onClick={change}>스낵</Button>
            <Button name='case4' style={color.case4 ? {background:'red'} : undefined} variant="contained" onClick={change}>냉동/빙과류</Button>
            </DivButton>

            <DivContainer>
                <DivHalfMenu>
                    <br/>
                    <h3>{goods.g_name}</h3>
                    <br/>
                    <h5 style={{textDecorationLine: 'line-through'}}>정상가 : {goods.g_price}</h5>
                    <h5>할인가 : {goods.g_discount}</h5><br/>
                    <Button style={{background:'gray'}} variant="contained" onClick={submitForm}>장바구니 담기 </Button>
                </DivHalfMenu>
                <DivHalfMenu>
                     <img src={"data:image/jpeg;base64,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"}/>
                </DivHalfMenu>
            </DivContainer>
            <hr/>
            {/*<DivContainer>*/}
            {/*    <DivHalfMenu>*/}
            {/*        <br/>*/}
            {/*        <h3>{goods2.g_name}</h3>*/}
            {/*        <h6>{goods2.g_close}</h6>*/}
            {/*        <br/>*/}
            {/*        <h5 style={{textDecorationLine: 'line-through'}}>정상가 : {goods2.g_price}</h5>*/}
            {/*        <h5 style={{textDecorationLine: 'line-through'}}>할인가 : {goods2.g_discount}</h5>*/}
            {/*        <h5>혜택적용가 : {goods2.g_eventPrice}</h5>*/}
            {/*        <h6>남은 수량 : {goods2.g_count}</h6><br/>*/}
            {/*        <Button style={{background:'gray'}} variant="contained" onClick={submitForm}>장바구니 담기 </Button>*/}
            {/*    </DivHalfMenu>*/}
            {/*    <DivHalfMenu>*/}
            {/*        <img src={"data:image/jpeg;base64,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"}/>*/}
            {/*    </DivHalfMenu>*/}
            {/*</DivContainer>*/}
            <DivContainer>
                <Button style={{background:'red',width:'100%'}} variant="contained" onClick={submitForm}>장바구니 보기 </Button>
            </DivContainer>







        </>
    );
};