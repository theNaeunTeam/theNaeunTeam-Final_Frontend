import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserNavbar from "../UserNavbar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {UserReserveTableBuilder} from "./UserReserveTableBuilder";
import styled from "styled-components";
import {dummyType} from "../../../lib/types";

const DivContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  width: 17%;
  font-size: 20px;
`;

export default function UserReserve(props: { loading: any; g_category: any; setG_category: any; r_status: any; setR_status: any; setSearchInput: any; searchReserve: any; list: any; changeReserveStatus: any; indexMinus: any; startIndex: any; indexPlus: any; }) {

    const {
        loading,
        g_category,
        setG_category,
        r_status,
        setR_status,
        setSearchInput,
        searchReserve,
        list,
        changeReserveStatus,
        indexMinus,
        startIndex,
        indexPlus,

    } = props;

    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DivNav>
                <UserNavbar/>
            </DivNav>

            <div className={'DivMain'}>
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
                        <th>방문일</th>
                        <th>결제금액</th>
                        <th>상태</th>
                        <th>취소</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.length === 0 ?
                        <div className='centerDiv2'><span className='centerSpan'>예약 기록이 없습니다.</span></div>
                        : list.map((data: dummyType, idx: number) => <UserReserveTableBuilder data={data} idx={idx}
                                                                                              key={idx}
                                                                                              changeReserveStatus={changeReserveStatus}/>)}
                    </tbody>
                </table>
                <div className='aa' style={{height: '80px', display: 'inline-flex'}}>
                    <span onClick={indexMinus}>◀ 이전</span>
                    <div style={{fontSize: '20px', margin: '0 10px'}}>{startIndex / 10 + 1}</div>
                    <span onClick={indexPlus}> 다음 ▶</span>
                </div>
            </div>
        </DivContainer>
    )
}