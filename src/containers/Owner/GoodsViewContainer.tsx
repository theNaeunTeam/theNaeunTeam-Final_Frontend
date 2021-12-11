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
import {goodsViewType} from '../../lib/types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../../lib/styles/table.scss'
import {GoodsViewTableBuilder} from "../../components/Owner/GoodsViewTableBuilder";
import {useSweetAlert} from "../../lib/useSweetAlert";


const DivContainer = styled.div`

  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
  text-align: center;
  justify-content: center;
`;

export default function GoodsViewContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const history = useHistory();
    const dispatch = useDispatch();
    const {authReducer} = useSelector((state: RootState) => state);
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);


    const [list, setList] = useState<goodsViewType[]>([]);
    const [g_category, setG_category] = useState('');
    const [g_status, setG_status] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        if (localStorage.getItem('ownerToken')) {
            searchGoods();
        }
    }, [startIndex]);

    const searchGoods = async () => {
        const URL = '/owner/search';
        setLoading(true);
        if (g_category != '' || g_status != '' || searchInput != '') {
            setStartIndex(0);
        }
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&g_status=${g_status}&searchInput=${searchInput}&startIndex=${startIndex}`);
            setList(res.data);

        } catch (e: any) {
            if (e.response.data.status === 500) {
                alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도 바랍니다.');
            } else {
                alert('데이터를 가져오는 중 문제가 발생했습니다. \n잠시 후 다시 시도 바랍니다.')
            }

        }
        setLoading(false);

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
                fireSweetAlert({title: '상품 판매 완료 처리하였습니다', icon: 'success'});
                searchGoods();
            })
            .catch(e => {
                // @ts-ignore
                const err = e.response;
                if (err.status === 500) {
                    alert('서버 작동 중 에러가 발생했습니다. \n잠시 후 다시 시도해주세요.');
                } else if (err.status === 400) {
                    alert(err.data.error);
                } else {
                    alert('예상치 못한 에러로 인해 상품 판매완료 처리 실패하였습니다.');
                }

            })
    };

    const indexMinus = () => {
        if (startIndex === 0) {
            fireSweetAlert({title: '첫 페이지 입니다', icon: 'info'});
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
                <h1 style={{marginBottom: '50px'}}>상품조회</h1>
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
                            value={g_status}
                            onChange={e => setG_status(e.target.value)}
                        >
                            <MenuItem value=''>모두 보기</MenuItem>
                            <MenuItem value={'0'}>판매중</MenuItem>
                            <MenuItem value={'1'}>판매완료</MenuItem>
                            <MenuItem value={'2'}>판매중지</MenuItem>

                        </Select>
                    </FormControl>

                    <TextField className='goodsNameS' id="outlined-basic" label="상품명" variant="outlined" name={'total'}
                               onChange={e => setSearchInput(e.target.value as string)}/>

                    <Button sx={{m: 1.3}} variant="outlined" onClick={searchGoods}>검색</Button>


                </div>
                <table className='goodstbl'>
                    <thead>

                    <tr>
                        <th>상품명</th>
                        <th>분류</th>
                        <th>정가</th>
                        <th>할인가</th>
                        <th>유통기한</th>
                        <th>상태</th>
                        <th>판매수량</th>
                        <th>남은수량</th>
                        <th>수정</th>
                        <th>판매완료</th>
                    </tr>

                    </thead>
                    <tbody>
                    {list.length === 0 ?
                        <div className='centerDiv'><span className='centerSpan'>등록된 상품이 없습니다.</span></div>
                        : list.map((data, idx) => <GoodsViewTableBuilder data={data} idx={idx} key={idx}
                                                                         deleteGoods={deleteGoods}
                                                                         modifyGoods={modifyGoods}/>)}
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