import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import fullStar from "../../styles/images/star1.png";
import Swal from 'sweetalert2';
import UserNavbar from "./UserNavbar";
import '../../styles/table.scss';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";


const DivContainer = styled.div`
  //border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 0 13px 0 0;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
`;

const DivNav = styled.div`
  //border: solid blue;
  width: 17%;
  font-size: 20px;
`;
const DivMain = styled.div`
  //border: solid red;
  width: 80%;
  height: 100%;
  text-align: center;
  padding: 20px;
  min-height: 800px;
  margin-right: 15%;


`;

export default function FavorStore() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    const [startIndex, setStartIndex] = useState(0);

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);

    const [list, setList] = useState<favorListType[]>([]);
    const [loading, setLoading] = useState(true);

    type favorListType = {
        o_name: string,
        o_address: string,
        o_time1: string,
        o_time2: string,
        o_phone: string,
        o_approval: number
        f_o_sNumber: string
    }

    function favoroff() {
        Swal.fire({
            title: '즐겨찾기에서 해제되었습니다',
            text: "즐겨찾기에서 확인하실 수 있습니다.",
            icon: 'success',
            // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            // cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                //"삭제" 버튼을 눌렀을 때 작업할 내용을 이곳에 넣어주면 된다.
            }
        })
    }

    useEffect(() => {
        initialize();
    }, [startIndex]);

    const initialize = async () => {
        const URL = '/user/favorList';
        setLoading(true);
        try {
            const res = await client.get(URL+`?startIndex=${startIndex}`);
            // setList(res.data);

            setList(res.data);
            console.log(res);
            setLoading(false);

        } catch (e:any) {
            console.log(e);
            if(e.response.data.status === 500){
                alert('서버 작동 중 에러가 발생했습니다. 잠시 후 다시 시도 바랍니다.');

            }else{
                alert('데이터를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도 바랍니다.')
            }
        }
    };
    // 즐겨찾기 해제 api
    const favorOff = async (input: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!authReducer.isUser) {
            alert('로그인이 필요한 기능입니다.');
            return false;
        }
        const URL = '/user/FavorOff';
        const data: { f_o_sNumber: number } = {
            f_o_sNumber: Number((input.target as HTMLImageElement).title)
        }
        console.log(data);
        try {
            const res = await client.post(URL, data);
            console.log(res.data);
            // alert('즐겨찾기가 해제되었습니다.')
            // setFavorites(false);
            favoroff();
            initialize();

        } catch (e:any) {
            console.log(e);
            if(e.response.status === 500){
                alert("서버 작동 중 에러가 발생했습니다. 잠시 후 다시 시도 바랍니다.")
            }else if(e.response.status === 400){
                alert(e.response.data.error);
            }else{
                alert('예상치 못한 에러로 인해 즐겨찾기 해제 실패하였습니다. 잠시 후 다시 시도 바랍니다.')
            }
        }
    }
    const indexMinus = () => {
        if (startIndex === 0) {
            alert('첫 페이지입니다.');
        } else {
            setStartIndex(startIndex - 10);
        }
    }
    const indexPlus = () => {
        if (list.length === 10) {
            setStartIndex(startIndex + 10);
        }else{
            alert('마지막 페이지입니다.');
        }
    }
    const TableBuilder = (props: { data: favorListType, idx: number }) => {
        return (
            <tr>
                {/*<td>*/}
                {/*    {props.idx + 1}*/}
                {/*</td>*/}
                <td>
                    {props.data.o_name}
                </td>
                <td>
                    {props.data.o_address}
                </td>
                <td>
                    {props.data.o_phone}
                </td>
                <td>
                    {props.data.o_time1} ~ {props.data.o_time2}
                </td>
                <td>
                    {props.data.o_approval === 1 ? '영업중'
                        : props.data.o_approval === 3 ? '서비스 이용 중단'
                            : null
                    }
                </td>
                <td>
                    {/*@ts-ignore*/}
                    <span style={{marginLeft: "auto"}}><img style={{width: "40px"}} src={fullStar}
                                                            title={props.data.f_o_sNumber} onClick={e => favorOff(e)}/></span>
                </td>

            </tr>
        )
    };
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

            <DivMain>
                <h1 style={{marginBottom:'50px'}}>즐겨찾는가게</h1>
                <table className='favor'>
                    <thead>
                    <tr>
                        {/*<th>순번</th>*/}
                        <th>가게명</th>
                        <th>가게주소</th>
                        <th>가게번호</th>
                        <th>운영시간</th>
                        <th>가게 정보</th>
                        <th>해제</th>

                    </tr>
                    </thead>
                    <tbody>
                    {list.length === 0 ? <div className='centerDiv1'><span className='centerSpan'>즐겨찾는 가게가 없습니다. </span></div>
                        : list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                    </tbody>
                </table>
                <div className='aa' style={{height: '80px', display: 'inline-flex'}}>
                    <span onClick={indexMinus}>◀ 이전</span>
                    <div style={{fontSize: '20px', margin: '0 10px'}}>{startIndex / 10 + 1}</div>
                    <span onClick={indexPlus}> 다음 ▶</span>
                </div>
            </DivMain>
        </DivContainer>
    )
}
