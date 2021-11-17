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
      display: flex;
      justify-content: space-evenly;
      margin: 50px;
      padding: 10px;
      width:100%;
    `;

    const DivHalfMenu = styled.div`
      flex: 1;
      margin: 10px;
      padding: 10px;
      width:40%;
    `;



    const [color, setColor] = useState(initColor);
    const [goods, setGoods] = useState(initGoods1);

    const [rows, setRows] = useState<tableType[]>(initGoods2);

    const change = (e: React.MouseEvent<HTMLButtonElement>)=>{
        const btnValue = (e.target as HTMLButtonElement).name; // button의 name값을 가져옴
        // @ts-ignore
        setColor({...initColor2, [btnValue]:!color[btnValue]});

    };

    interface ImatchParams {
        o_sNumber: string;
    }

    const match = useRouteMatch<ImatchParams>();

    React.useEffect(() => {
        // 마운트 될 때 number값 출력
        console.log(match.params);
    }, [])


    const storeTableInit = async () => {

            const URL = '/user/shopView';

            try {
                const res = await client.get(URL+'?o_sNumber='+match.params.o_sNumber);
                console.log(res);
                console.log(match.params.o_sNumber);

                setRows(res.data);
            } catch (e) {
                console.log(e);
            }
    };

    useEffect( ()=>{
        storeTableInit();
    },[])


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

    const TableBuilder = (props: { data: tableType, idx: number }) => {
        return(
            <>
            <DivContainer>
                <DivHalfMenu>
                    <br/>
                    <h3>{props.data.g_name}</h3>
                    <h6>{props.data.g_expireDate}</h6>
                    <br/>
                    <h5 style={{textDecorationLine: 'line-through'}}>정상가 : {props.data.g_price}</h5>
                    <h5>할인가 : {props.data.g_discount}</h5>
                    <h6>남은 수량 : {props.data.g_count}</h6><br/>
                    <Button style={{background:'gray'}} variant="contained" onClick={submitForm}>장바구니 담기 </Button>
                </DivHalfMenu>
                <DivHalfMenu>
                    <img style={{maxWidth:'100%'}} src={props.data.g_image}/>
                </DivHalfMenu>
            </DivContainer>
            </>
        )
    }


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
            <button style={{background:'white'}}>아아아</button>
            {/*{textDecorationLine:'underline'},*/}
            <DivButton>
            <Button name='case1' style={color.case1 ? {background:'red'} : undefined} variant="contained" onClick={(e)=>change(e)}>전체</Button>
            <Button name='case2' style={color.case2 ? {background:'red'} : undefined} variant="contained" onClick={change}>카페/음료</Button>
            <Button name='case3' style={color.case3 ? {background:'red'} : undefined} variant="contained" onClick={change}>스낵</Button>
            <Button name='case4' style={color.case4 ? {background:'red'} : undefined} variant="contained" onClick={change}>냉동/빙과류</Button>
            </DivButton>


            <hr/>
            {/*{rows.map((a,i)=>{*/}
            {/*    return a.g_name*/}
            {/*})}*/}
            {rows.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
            <DivContainer>
                <Button style={{background:'red',width:'100%'}} variant="contained" onClick={submitForm}>장바구니 보기 </Button>
            </DivContainer>









        </>
    );
};