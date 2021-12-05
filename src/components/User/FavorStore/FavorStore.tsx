import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserNavbar from "../UserNavbar";
import styled from "styled-components";
import {FavorStoreTableBuilder} from "./FavorStoreTableBuilder";
import {favorListType} from "../../../lib/types";

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

export default function FavorStore(props: { loading: any; list: any; indexMinus: any; indexPlus: any; startIndex: any; favorOff: any; }) {

    const {
        loading,
        list,
        indexMinus,
        indexPlus,
        startIndex,
        favorOff
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
                <h1 style={{marginBottom: '50px'}}>즐겨찾는가게</h1>
                <table className='favor'>
                    <thead>
                    <tr>
                        <th>가게명</th>
                        <th>가게주소</th>
                        <th>가게번호</th>
                        <th>운영시간</th>
                        <th>가게 정보</th>
                        <th>해제</th>

                    </tr>
                    </thead>
                    <tbody>
                    {list.length === 0 ?
                        <div className='centerDiv1'><span className='centerSpan'>즐겨찾는 가게가 없습니다. </span></div>
                        : list.map((data: favorListType, idx: number) => <FavorStoreTableBuilder data={data} idx={idx}
                                                                                                 key={idx}
                                                                                                 favorOff={favorOff}/>)}
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