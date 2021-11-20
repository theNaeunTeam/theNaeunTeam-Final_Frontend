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

export default function UserReserve() {

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
    type dummyType = {
        r_g_code: number,
        r_code: number,
        r_u_id: string,
        r_count: number,
        r_firstTime: string,
        r_status: number,
        r_customOrder: string,
        r_pay : number,
        g_name: string,
        g_category: string,
        g_expireDate: string,
        g_count: number,
        g_status: number,
    };

    const [list, setList] = useState<dummyType[]>([]);
    const [g_category, setG_category] = useState('');
    const [r_status, setR_status] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() =>{
        initialize();
    },[]);

    const initialize = async () =>{
        const URL = '/user/reserveList';
        try{
            const res = await client.get(URL);

            setList(res.data);
            console.log(res);
        }catch (e){
            console.log(e);
        }
    }

    const changeReserveStatus = async (input: React.MouseEvent<HTMLAnchorElement,MouseEvent>) => {
        const data : { r_code : number} ={
            r_code : Number((input.target as HTMLButtonElement).name)
        };

        const URL = '/user/changeReserveStatus';

        try{
            const res = await client.patch(URL,data);
            console.log(res);
            initialize();
            alert('예약 취소 완료');
        }catch (e){
            console.log(e);
            alert('예약 취소 실패');
        }
   }
   const  searchReserve = async () => {
     const URL ='/user/searchReserve';
     try{
         const res = await client.get(`${URL}?g_category=${g_category}&r_status=${r_status}&searchInput=${searchInput}`);
         console.log(res);
         setList(res.data);
     }catch (e){
         alert('검색 실패');
         console.log(e);
     }
   }
    const TableBuilder = (props: { data: dummyType, idx: number }) => {

        return (
            <tr>
                <td>
                    {props.idx + 1}
                </td>
                <td>
                    {props.data.g_name}
                </td>
                <td>
                    {props.data.g_category}
                </td>
                <td>
                    {props.data.g_expireDate}
                </td>
                <td>
                    {props.data.g_count}
                </td>
                <td>
                    {props.data.g_status === 0 ? '판매중'
                        : props.data.g_status === 1 ? '판매 완료'
                            : props.data.g_status === 2 ? '판매 중지' : null}
                </td>

                <td>
                    {props.data.r_count}
                </td>
                <td>
                    {props.data.r_customOrder}
                </td>
                <td>
                    {props.data.r_firstTime}
                </td>
                <td>
                    {props.data.r_pay}
                </td>
                <td>
                    {props.data.r_status === 0 ? '예약 승인 대기중'
                        : props.data.r_status === 1 ? '승인 완료'
                            : props.data.r_status === 2 ? '거절됨'
                                : props.data.r_status === 3 ? '구매완료'
                                    : props.data.r_status === 4 ? '노쇼'
                                        :props.data.r_status === 5 ? '취소됨'
                                        : null
                    }
                </td>
                <td>

                    {/*@ts-ignore*/}
                    <Button data-testid='my-test-id' name={props.data.r_code} variant="outlined"
                            onClick={e => changeReserveStatus(e)}
                    >취소</Button>
                </td>

            </tr>
        )
    };

    return (
        <DivContainer>
            <h2>예약</h2>
            <div>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={g_category}
                        onChange={e => setG_category(e.target.value)}
                    >
                        <MenuItem value=''>모두 보기</MenuItem>
                        <MenuItem value='과자류'>과자류</MenuItem>
                        <MenuItem value='간편식'>간편식</MenuItem>
                        <MenuItem value='음료'>음료</MenuItem>
                        <MenuItem value='즉석조리'>즉석조리</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">상태</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={r_status}
                        onChange={e => setR_status(e.target.value)}
                    >
                        <MenuItem value=''>모두 보기</MenuItem>
                        <MenuItem value='0'>승인 대기 중</MenuItem>
                        <MenuItem value='1'>승인</MenuItem>
                        <MenuItem value='2'>거절</MenuItem>
                        <MenuItem value='4'>노쇼</MenuItem>
                        <MenuItem value='3'>구매완료</MenuItem>
                        <MenuItem value='5'>취소</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="상품명" variant="outlined" name={'total'}
                           onChange={e => setSearchInput(e.target.value as string)}/>
                <Button variant="outlined" onClick={searchReserve} >검색</Button>
            </div>
            <TableStyled>
                <thead style={{border: "solid black 0.1px"}}>
                <tr>
                    <th>순번</th>
                    <th>상품명</th>
                    <th>상품분류</th>
                    <th>유통기한</th>
                    <th>남은수량</th>
                    <th>상품 상태</th>
                    <th>주문 수량</th>
                    <th>요청사항</th>
                    <th>방문 예정 시간</th>
                    <th>결제금액</th>
                    <th>상태</th>
                    <th>취소</th>
                </tr>
                </thead>
                <tbody>

                {list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                </tbody>
            </TableStyled>
        </DivContainer>
    )
}
