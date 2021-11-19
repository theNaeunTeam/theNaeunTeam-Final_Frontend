import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import {goodsViewType} from '../../modules/types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TableStyled = styled.table`
  padding: 30px;
  margin: auto;
  width: 80%;
`;

const DivContainer = styled.div`
  text-align: center;
`;

export default function GoodsView() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {authReducer} = useSelector((state: RootState) => state);
    useLayoutEffect(() => {
        if (!authReducer.isOwner) history.push('/err');
    }, []);


    const [list, setList] = useState<goodsViewType[]>([]);
    const [g_category, setG_category] = useState('');
    const [g_status, setG_status] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URL = '/owner/goodsView';
        try {
            const res = await client.get(`${URL}?o_sNumber=${authReducer.o_sNumber}`);
            setList(res.data);
            setLoading(false);
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
        const URL = '/owner/search';
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

    const TableBuilder = (props: { data: goodsViewType, idx: number }) => {

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
                <td> {props.data.g_status === 0 ? '판매중'
                    : props.data.g_status === 1 ? '판매완료'
                        : props.data.g_status === 2 ? '판매중지' : null}
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
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
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
                            value={g_status}
                            onChange={e => setG_status(e.target.value)}
                        >
                            <MenuItem value=''>모두 보기</MenuItem>
                            <MenuItem value={'0'}>판매중</MenuItem>
                            <MenuItem value={'1'}>판매완료</MenuItem>
                            <MenuItem value={'1'}>판매완료</MenuItem>
                            <MenuItem value={'2'}>판매중지</MenuItem>

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
                        <th>상태</th>
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
        </>
    )
}
