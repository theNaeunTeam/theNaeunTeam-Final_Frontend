import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";

export default function GoodsView() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {authReducer} = useSelector((state: RootState) => state);

    const TableStyled = styled.table`
      padding: 30px;
      margin: auto;
      width: 80%;
    `;

    const DivContainer = styled.div`
      text-align: center;
    `;

    type goodsType = {
        g_owner: string,
        g_code: number,
        g_name: string,
        g_count: number,
        g_price: number,
        g_discount: number,
        g_detail: string,
        g_image: string,
        g_expireDate: string,
        g_category: string,
    };

    const dummy = {
        g_owner: '오너',
        g_code: 123,
        g_name: '홈런볼',
        g_category: '과자류',
        g_price: 3000,
        g_discount: 300,
        g_expireDate: '2021-11-11',
        g_count: 1,
        g_detail: '상세',
        g_image: '이미지경로',
    };

    const [list, setList] = useState<goodsType[]>([]);
    const [g_category, setG_category] = useState('');
    const [g_status, setG_status] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        // 서버에서 상품 정보 리스트를 받아오는 코드
        const URL = '/owner/goodsView';
        console.log(`${URL}?g_owner=${authReducer.o_sNumber}`);
        try {
            const res = await client.get(`${URL}?g_owner=${authReducer.o_sNumber}`);
            console.log(res.data);
            setList(res.data);
            // setList([dummy]);
        } catch (e) {
            console.log(e);
        }
    };


    const modifyGoods = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const g_code: string = (e.target as HTMLButtonElement).name;
        const idx = list.findIndex((x) => x.g_code.toString() === g_code);
        dispatch({type: 'passToModifyPage', payload: list[idx]});
        history.push('/owner/addproduct');
    };

    const deleteGoods = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const g_code: string = (e.target as HTMLButtonElement).name;
        const URL = '/owner/deleteGoods';
        client.patch(URL, {g_code: g_code})
            .then(res => {
                console.log(res);
                alert('성공');
            })
            .catch(e => {
                console.log(e);
                alert('실패');
            })
    };

    const searchGoods = async () => {
        const URL = ''
        console.log(`${URL}?g_category=${g_category}&g_status=${g_status}&searchInput=${searchInput}`);
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&g_status=${g_status}&searchInput=${searchInput}`);
            console.log(res);
            setList(res.data);
        } catch (e) {
            alert('검색실패');
            console.log(e);
        }

    }

    const TableBuilder = (props: { data: goodsType, idx: number }) => {

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
                    {props.data.g_price}
                </td>
                <td>
                    {props.data.g_discount}
                </td>
                <td>
                    {props.data.g_expireDate}
                </td>
                <td>
                    {props.data.g_count}
                </td>
                <td>
                    <button name={`${props.data.g_code}`} onClick={e => modifyGoods(e)}>수정</button>
                </td>
                <td>
                    <button name={`${props.data.g_code}`} onClick={e => deleteGoods(e)}>삭제</button>
                </td>
            </tr>
        )
    };


    return (
        <DivContainer>
            <h2>상품조회</h2>
            <div>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={g_category}
                        onChange={e => setG_category(e.target.value)}
                    >
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
                        value={g_status}
                        onChange={e => setG_status(e.target.value)}
                        label="Age"
                    >
                        <MenuItem value={'판매중'}>판매중</MenuItem>
                        <MenuItem value={'판매완료'}>판매완료</MenuItem>
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
                    <th>분류</th>
                    <th>정가</th>
                    <th>할인가</th>
                    <th>유통기한</th>
                    <th>남은수량</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                </tbody>
            </TableStyled>

        </DivContainer>
    )
}
