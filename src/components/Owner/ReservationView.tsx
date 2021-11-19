import React, {useEffect, useState} from 'react';
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

export default function ReservationView() {

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
        g_name: string,
        g_category: string,
        g_expireDate: string,
        g_count:number,
        g_status: number,
    };

    const dummy = {
        g_code: 546798,
        g_name: '홈런볼',
        g_category: '과자류',
        g_price: 3000,
        g_discount: 300,
        g_expireDate: '2021-11-11',
        g_status: 0,
    };

    const {authReducer} = useSelector((state: RootState) => state);


    const [list, setList] = useState<dummyType[]>([]);
    const [g_category, setG_category] = useState('');
    const [r_status, setR_status] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URL = '/owner/reserveList';
        try {
            const res = await client.get(`${URL}?g_owner=${authReducer.o_sNumber}`);
            // setList(res.data);

            setList(res.data);
            console.log(res);
            console.log(res.data[0].goodsDTO);
        } catch (e) {
            console.log(e);
        }
    };

    const changeGoodsStatus = async (input: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const data: { r_code: number, check: number } = {
            r_code: Number((input.target as HTMLButtonElement).name),
            check: selectedStatus
        };

        const URL = '/owner/statusChange';

        try {
            const res = await client.patch(URL, data);

            console.log(res);

            initialize();

        } catch (e) {
            console.log(e);
            alert('상품상태변경 실패');
        }

    };

    const searchGoods = async () => {
        const URL = '/owner/searchReserve';
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&r_status=${r_status}&searchInput=${searchInput}`);
            console.log(res);
            setList(res.data);
        } catch (e) {
            alert('검색실패');
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
                    {props.data.r_u_id}
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
                    {props.data.r_status === 0 ? '예약 승인 대기중'
                        : props.data.r_status === 1 ? '승인 완료'
                            : props.data.r_status === 2 ? '거절됨'
                                : props.data.r_status === 3 ? '판매완료'
                                    : props.data.r_status === 4 ? '노쇼' : null
                    }
                </td>
                <td>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={selectedStatus}
                            onChange={e => setSelectedStatus(e.target.value as number)}
                        >
                            <MenuItem value={1}>승인</MenuItem>
                            <MenuItem value={2}>거절</MenuItem>
                            <MenuItem value={4}>노쇼</MenuItem>
                            <MenuItem value={3}>판매완료</MenuItem>
                        </Select>
                    </FormControl>
                    {/*@ts-ignore*/}
                    <Button data-testid='my-test-id' name={props.data.r_code} variant="outlined"
                            onClick={e => changeGoodsStatus(e)}>확인</Button>
                </td>

            </tr>
        )
    };


    return (
        <DivContainer>
            <h2>예약현황</h2>
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
                        <MenuItem value='1'>승인</MenuItem>
                        <MenuItem value='2'>거절</MenuItem>
                        <MenuItem value='4'>노쇼</MenuItem>
                        <MenuItem value='3'>판매완료</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="상품명" variant="outlined" name={'total'}
                           onChange={e => setSearchInput(e.target.value as string)}/>
                <Button variant="outlined" onClick={searchGoods}>검색</Button>
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
                    <th>주문자</th>
                    <th>주문 수량</th>
                    <th>요청사항</th>
                    <th>방문 예정 시간</th>
                    <th>상태</th>
                    <th>승인</th>
                </tr>
                </thead>
                <tbody>

                {list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                </tbody>
            </TableStyled>

        </DivContainer>
    )
}
