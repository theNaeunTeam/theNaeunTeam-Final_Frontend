import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Button} from "@mui/material";
import styled from "styled-components";

export default function GoodsView() {

    const TableStyled = styled.table`
      padding: 30px;
      margin: auto;
      width: 100%;
    `;

    const DivContainer = styled.div`
      text-align: center;
      padding: 50px;
      margin: 10px;
    `;

    const DivRow = styled.div`
      display: flex;
      justify-content: space-between;
    `

    type dummyType = {
        g_code: number,
        g_name: string,
        g_category: string,
        g_price: number,
        g_discount: number,
        g_expireDate: string,
        g_count: number,
    };

    const dummy = {
        g_code: 123,
        g_name: '홈런볼',
        g_category: '과자류',
        g_price: 3000,
        g_discount: 300,
        g_expireDate: '2021-11-11',
        g_count: 1,
    };

    const [list, setList] = useState<dummyType[]>([]);

    // 변경 필요
    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const initialize = async () => {
        // 서버에서 상품 정보 리스트를 받아오는 코드
        setList([dummy]);
    };

    useEffect(() => {
        initialize();
    }, []);

    const modifyGoods = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const g_code: string = (e.target as HTMLButtonElement).name; // 선택한 row의 상품고유번호
        // 상품 등록 페이지 재활용?
    };

    const deleteGoods = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const g_code: string = (e.target as HTMLButtonElement).name; // 선택한 row의 상품고유번호

    };

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
            <DivRow>
                <TextField id="outlined-basic" label="전체" variant="outlined" name={'total'}/>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">분류</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">상태</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="검색" variant="outlined" name={'total'}/>
                <Button variant="outlined">버튼</Button>
            </DivRow>

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
