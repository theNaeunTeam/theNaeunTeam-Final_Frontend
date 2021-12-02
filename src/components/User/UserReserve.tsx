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
import UserNavbar from "./UserNavbar";
import '../../styles/table.scss'

const DivContainer = styled.div`
  //text-align: center;
  //border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  //border: solid blue;
  width: 17%;
  font-size: 20px;
`;
const DivMain = styled.div`
  //border: solid red;
  width: 80%;
  height: 100%;
  text-align: center;
  padding: 20px;
  min-height: 800px;
  margin-right: 15%;

`;


export default function UserReserve() {

    const {authReducer} = useSelector((state: RootState) => state);
    const [startIndex, setStartIndex] = useState(0);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);


    type dummyType = {
        r_g_code: number,
        r_code: number,
        r_u_id: string,
        r_count: number,
        r_firstTime: string,
        r_firstDate: string,
        r_status: number,
        r_customOrder: string,
        r_pay: number,
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
    useEffect(() => {
        searchReserve();
    }, [startIndex]);

    // const initialize = async () => {
    //     const URL = '/user/reserveList';
    //     try {
    //         const res = await client.get(URL+`?startIndex=${startIndex}`);
    //         setList(res.data);
    //         console.log(res);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const changeReserveStatus = async (input: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const data: { r_code: number } = {
            r_code: Number((input.target as HTMLButtonElement).name)
        };

        const URL = '/user/changeReserveStatus';

        try {
            const res = await client.patch(URL, data);
            console.log(res);
            searchReserve();
            alert('예약 취소 완료');
        } catch (e) {
            console.log(e);
            alert('예약 취소 실패');
        }
    }
    const searchReserve = async () => {
        const URL = '/user/searchReserve';
        if (g_category != '' || r_status != '' || searchInput != '') {
            setStartIndex(0);
        }
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&r_status=${r_status}&searchInput=${searchInput}&startIndex=${startIndex}`);
            console.log(res);
            setList(res.data);
        } catch (e) {
            alert('검색 실패');
            console.log(e);
        }
    }

    const indexMinus = () => {
        if (startIndex === 0) {
            alert('첫 페이지입니다.');
        } else {
            setStartIndex(startIndex - 10);
        }
    }
    const indexPlus = () => {
        if (list.length === 10) {
            setStartIndex(startIndex + 10);
        } else {
            alert('마지막 페이지입니다.');
        }


    }

    const TableBuilder = (props: { data: dummyType, idx: number }) => {

        return (
            <tr className={'tbl'}>
                {/*<td>*/}
                {/*    {props.idx + 1}*/}
                {/*</td>*/}
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
                    {props.data.r_firstDate} / {props.data.r_firstTime}
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
                                        : props.data.r_status === 5 ? '취소됨'
                                            : null
                    }
                </td>
                <td>

                    {/*@ts-ignore*/}
                    <Button data-testid='my-test-id' name={props.data.r_code} variant="outlined"
                            sx={{m: 1}} onClick={e => changeReserveStatus(e)}
                    >취소</Button>
                </td>

            </tr>
        )
    };

    return (
        <DivContainer>
            <DivNav>
                <UserNavbar/>
            </DivNav>
            <DivMain>
                <h1 style={{marginBottom: '50px'}}>예약내역</h1>
                <div>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
                        <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={g_category}
                            onChange={e => setG_category(e.target.value)}
                        >
                            <MenuItem value=''>모두 보기</MenuItem>
                            <MenuItem value='마실것'>마실것</MenuItem>
                            <MenuItem value='신선식품'>신선식품</MenuItem>
                            <MenuItem value='가공식품'>가공식품</MenuItem>
                            <MenuItem value='냉동식품'>냉동식품</MenuItem>
                            <MenuItem value='조리/반조리'>조리/반조리</MenuItem>
                            <MenuItem value='식품외 기타'>식품외 기타</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
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
                    <TextField className='goodsNameS' id="outlined-basic" label="상품명" variant="outlined" name={'total'}
                               onChange={e => setSearchInput(e.target.value as string)}/>
                    <Button sx={{m: 1.3}} variant="outlined" onClick={searchReserve}>검색</Button>
                </div>
                <table className='favor'>
                    <thead>
                    <tr>
                        {/*<th>순번</th>*/}
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
                    {list.length === 0 ?
                        <div className='centerDiv2'><span className='centerSpan'>예약 기록이 없습니다.</span></div>
                        : list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                    </tbody>
                </table>
                <div className='aa' style={{height: '80px', display: 'inline-flex'}}>
                    <span onClick={indexMinus}>◀ 이전</span>
                    <div style={{fontSize: '20px', margin: '0 10px'}}>{startIndex / 10 + 1}</div>
                    <span onClick={indexPlus}> 다음 ▶</span>
                </div>
            </DivMain>
        </DivContainer>
    )
}
