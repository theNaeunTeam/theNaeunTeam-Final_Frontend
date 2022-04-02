import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useHistory} from "react-router-dom";
import {reservationViewType} from "../../lib/types";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {ReservationTableBuilder} from "../../components/Owner/ReservationTableBuilder";
import {useSweetAlert} from "../../lib/useSweetAlert";
import {useDispatch} from "react-redux";


const DivContainer = styled.div`
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
  text-align: center;
`;


export default function ReservationViewContainer() {
    const {fireSweetAlert} = useSweetAlert();
    const dispatch = useDispatch();

    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);


    const [list, setList] = useState<reservationViewType[]>([]);
    const [g_category, setG_category] = useState('');
    const [r_status, setR_status] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('ownerToken')) {
            searchGoods();
            dispatch({type:'clear'});
        }
    }, [startIndex]);

    const searchGoods = async () => {
        const URL = '/owner/searchReserve';
        setLoading(true);
        if (g_category != '' || r_status != '' || searchInput != '') {
            setStartIndex(0);
        }
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&r_status=${r_status}&searchInput=${searchInput}&startIndex=${startIndex}`);
            setList(res.data);
            setLoading(false);
        } catch (e: any) {
            if (e.response.data.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});

            } else {
                fireSweetAlert({title: '데이터를 가져오는데 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            }
        }
    }

    const changeGoodsStatus = async (input: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
        setLoading(true);
        const data: { r_code: number, check: number } = {
            r_code: Number((input.target as HTMLButtonElement).name),
            check: list[idx].selectedStatus,
        };

        const URL = '/owner/statusChange';

        try {
            const res = await client.patch(URL, data);
            fireSweetAlert({title: '상품 상태가 업데이트 되었습니다.', icon: 'success'});
            searchGoods();

        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text:'잠시 후 다시 시도 바랍니다.', icon: 'error'});
            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
            } else {
                alert('예상치 못한 에러로 인해 상태 변경 실패하였습니다. \n잠시 후 다시 시도 바랍니다.')
            }
        }
        setLoading(false);

    };

    const indexMinus = () => {
        if (startIndex === 0) {
            fireSweetAlert({title: '첫페이지 입니다', icon: 'info'});
        } else {
            setStartIndex(startIndex - 10);
        }
    }
    const indexPlus = () => {
        if (list.length === 10) {
            setStartIndex(startIndex + 10);
        } else {
            fireSweetAlert({title: '마지막 페이지 입니다', icon: 'info'});
        }
    }

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DivContainer>
                <h1 style={{marginBottom: '50px'}}>예약현황</h1>
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
                            <MenuItem value='3'>판매완료</MenuItem>
                            <MenuItem value='5'>취소됨</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className='goodsNameS' id="outlined-basic" label="상품명" variant="outlined" name={'total'}
                               onChange={e => setSearchInput(e.target.value as string)}/>
                    <Button sx={{m: 1.3}} variant="outlined" onClick={searchGoods}>검색</Button>

                </div>

                <table className='resertbl'>
                    <thead>
                    <tr>
                        {/*<th>순번</th>*/}
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
                    {list.length === 0 ?
                        <div className='centerDiv2'><span className='centerSpan'>예약 기록이 없습니다.</span></div>
                        : list.map((data, idx) => (<ReservationTableBuilder data={data} idx={idx} list={list}
                                                                            setList={setList}
                                                                            changeGoodsStatus={changeGoodsStatus}/>))}
                    </tbody>
                </table>
                <div className='aa' style={{height: '80px', display: 'inline-flex'}}>
                    <span onClick={indexMinus}>◀ 이전</span>
                    <div style={{fontSize: '20px', margin: '0 10px'}}>{startIndex / 10 + 1}</div>
                    <span onClick={indexPlus}> 다음 ▶</span>
                </div>
            </DivContainer>
        </>
    )
}
