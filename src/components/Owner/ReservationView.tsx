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
import {reservationViewType} from "../../modules/types";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import OwnerNavbar from "./OwnerNavbar";

const TableStyled = styled.table`
  padding: 30px;
  margin: auto;
  width: 80%;
`;

const DivContainer = styled.div`
  display: inline-flex;
  width: 100%;
  margin: 50px;
  padding: 10px;
`;

const DivNav = styled.div`
  width: 20%;
  font-size: large;

`;
const DivMain = styled.div`
  width: 70%;
  height: 100%;
`;
export default function ReservationView() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.push('/err');
    }, []);


    const [list, setList] = useState<reservationViewType[]>([]);
    const [g_category, setG_category] = useState('');
    const [r_status, setR_status] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const URL = '/owner/reserveList';
        try {
            const res = await client.get(`${URL}?g_owner=${localStorage.getItem('o_sNumber')}`);
            // setList(res.data);

            setList(res.data);
            console.log(res.data);
            // console.log(res.data[0].goodsDTO);
            setLoading(false);

        } catch (e) {
            console.log(e);
        }
    };

    const changeGoodsStatus = async (input: React.MouseEvent<HTMLAnchorElement, MouseEvent>, idx:number) => {
        const data: { r_code: number, check: number } = {
            r_code: Number((input.target as HTMLButtonElement).name),
            check: list[idx].selectedStatus,
        };

        console.log('서버로 보내는 배열 : ', data);

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

    const TableBuilder = (props: { data: reservationViewType, idx: number }) => {

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
                    {props.data.r_firstDate} / {props.data.r_firstTime}
                </td>
                <td>
                    {props.data.r_status === 0 ? '예약 승인 대기중'
                        : props.data.r_status === 1 ? '승인 완료'
                            : props.data.r_status === 2 ? '거절됨'
                                : props.data.r_status === 3 ? '판매완료'
                                    : props.data.r_status === 4 ? '노쇼'
                                        : props.data.r_status === 5 ? '취소됨'
                                            : null
                    }
                </td>
                <td>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            defaultValue={props.data.r_status}
                            value={props.data.selectedStatus}
                            onChange={e => {
                                const cp = [...list];
                                cp[props.idx].selectedStatus = Number(e.target.value);
                                setList(cp);
                            }}
                        >
                            <MenuItem value={1}>승인</MenuItem>
                            <MenuItem value={2}>거절</MenuItem>
                            <MenuItem value={4}>노쇼</MenuItem>
                            <MenuItem value={3}>판매완료</MenuItem>
                        </Select>
                    </FormControl>
                    {/*@ts-ignore*/}
                    <Button data-testid='my-test-id' name={props.data.r_code} variant="outlined"
                            onClick={e => changeGoodsStatus(e, props.idx)}>확인</Button>
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
                <DivNav>
                    <OwnerNavbar/>
                </DivNav>

                <DivMain>
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
                                <MenuItem value='마실것'>마실것</MenuItem>
                                <MenuItem value='신선식품'>신선식품</MenuItem>
                                <MenuItem value='가공식품'>가공식품</MenuItem>
                                <MenuItem value='냉동식품'>냉동식품</MenuItem>
                                <MenuItem value='조리/반조리'>조리/반조리</MenuItem>
                                <MenuItem value='식품외 기타'>식품외 기타</MenuItem>
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
                            <th>상품 상태</th>
                            <th>주문자</th>
                            <th>주문 수량</th>
                            <th>요청사항</th>
                            <th>방문 예정 일자</th>
                            <th>상태</th>
                            <th>승인</th>
                        </tr>
                        </thead>
                        <tbody>
                        { list.length === 0 ? '예약 기록이 없습니다.'
                            :list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                        </tbody>
                    </TableStyled>
                </DivMain>
            </DivContainer>
        </>
    )
}
