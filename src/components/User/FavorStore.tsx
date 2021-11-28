import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import fullStar from "../../styles/images/star1.png";
import Swal from 'sweetalert2';

const TableStyled = styled.table`

  padding: 30px;
  margin: auto;
  width: 80%;
`;

const DivContainer = styled.div`
  text-align: center;
`;
export default function FavorStore() {

    const {authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.push('/err');
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
    }, []);

    const initialize = async () => {
        const URL = '/user/favorList';
        try {
            const res = await client.get(URL);
            // setList(res.data);

            setList(res.data);
            console.log(res);
            setLoading(false);

        } catch (e) {
            console.log(e);
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

        } catch (e) {
            console.log(e);
        }
    }
    const TableBuilder = (props: { data: favorListType, idx: number }) => {

        return (
            <tr>
                <td>
                    {props.idx + 1}
                </td>
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
            <h2>즐겨찾는가게</h2>

            <TableStyled>
                <thead style={{border: "solid black 0.1px"}}>
                <tr>
                    <th>순번</th>
                    <th>가게명</th>
                    <th>가게주소</th>
                    <th>가게번호</th>
                    <th>운영시간</th>
                    <th>가게 정보</th>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                {list.length === 0 ? '즐겨찾는 가게가 없습니다. '
                    :list.map((data, idx) => <TableBuilder data={data} idx={idx} key={idx}/>)}
                </tbody>
            </TableStyled>
        </DivContainer>
    )
}
