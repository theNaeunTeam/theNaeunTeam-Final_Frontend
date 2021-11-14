import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Button} from "@mui/material";

export default function GoodsView() {

    const [list, setList] = useState<object[]>([]);

    // 변경 필요
    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const initialize = () => {

    }

    useEffect(() => {

    }, []);

    const TableBuilder = () => {

        return (
            <>

            </>
        )
    }


    return (
        <div style={{alignContent: 'center'}}>
            <div>
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
            </div>

            <table>
                <thead>
                <th>상품명</th>
                <th>분류</th>
                <th>정가</th>
                <th>할인가</th>
                <th>유통기한</th>
                <th>남은수량</th>
                <th>수정</th>
                <th>삭제</th>
                </thead>
                <tbody>

                </tbody>
            </table>

        </div>
    )
}
