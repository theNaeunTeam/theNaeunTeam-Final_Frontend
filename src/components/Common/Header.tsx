import React from "react";
import styled from "styled-components";

import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";

import '../../styles/Header.css'

export default function Header() {

    const history = useHistory();
    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('ownerToken');
        localStorage.removeItem('masterToken');
        dispatch({type: 'logoutAll'});
        history.push('/');
    };

    const DivWrap = styled.div`
      color: black;
      width: 100%;
      overflow: hidden;
      line-height: 22px;
      position: relative;
      line-height: 35px;
    `;
    const DivMaster = styled.div`
      float: left;

      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    `;

    const Info = styled.div`
      float: right !important;
    `;
    const UL = styled.ul`
      float: left;
      list-style: none;
      display: block;

      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    `;

    const First = () => {
        return (
            <>
                <li>
                    <Link to={'/login'}>로그인</Link>
                </li>
                <li>
                    <Link to={'/user/register'}>회원가입</Link>
                </li>
                <li>
                    <Link to={'/owner/register'}>가맹신청</Link>
                </li>
            </>
        )
    };
    const Login = () => {
        return (
            <>
                <li>
                    {authReducer.isOwner === true ? authReducer.o_sNumber + ' 점주님 반갑습니다.'
                        : null}
                    {authReducer.isUser === true ? authReducer.u_id + " 님 반갑습니다."
                        : null}
                    {authReducer.isMaster === true ? "관리자로 로그인 되었습니다."
                        : null}
                </li>
                <li>
                    {authReducer.isOwner === true || authReducer.isMaster === true ?
                        <button onClick={logout}>로그아웃</button>
                        : null}
                    {authReducer.isUser === true ?
                        <User/>
                        : null}
                </li>
            </>
        )
    };
    const User = () => {
        return (
            <>
                <li>
                    <Link to={'/user'}>마이페이지</Link>
                </li>
                <li>장바구니</li>
                <li><button onClick={logout}>로그아웃</button></li>
            </>
        )
    }
    return (
        <>

            <DivWrap>
                {/*관리자 인증 들어간 왼쪽 div*/}
                <DivMaster>
                    <Link to={'/master'}>관리자 인증</Link>
                </DivMaster>

                {/*로그인 회원가입 가맹신청 들어갈 오른쪽 div*/}
                <Info>
                    <UL>
                        {authReducer.isOwner === false && authReducer.isUser === false && authReducer.isMaster === false
                            ? <First/>
                            : <Login/>}
                    </UL>
                </Info>


                {/*<img src={logo} style={{height: '30px'}} alt="logo"/>*/}
                {/*<Navbar.Brand>공통헤더(임시)</Navbar.Brand>*/}
                {/*<Nav className="me-auto">*/}
                {/*    /!*<Nav.Link as={Nav}><Link className={'youngJin'} to={'/list'}>가게리스트</Link></Nav.Link>*!/*/}
                {/*    /!*<Nav.Link as={Nav}><Link className={'youngJin'} to={'/'}>메인페이지</Link></Nav.Link>*!/*/}
                {/*    /!*<Nav.Link as={Nav}><Link className={'youngJin'} to={'/user'}>유저마이페이지</Link></Nav.Link>*!/*/}
                {/*    /!*<Nav.Link as={Nav}><Link className={'youngJin'} to={'/owner'}>오너메인</Link></Nav.Link>*!/*/}
                {/*    */}
                {/*    */}
                {/*    */}
                {/*    */}
                {/*    <Nav.Link as={Nav}><Link className={'youngJin'} to={'/master'}>관리자 인증</Link></Nav.Link>*/}

                {/*    <Nav.Link as={Nav}><Link className={'youngJin'} to={'/login'}>로그인</Link></Nav.Link>*/}


                {/*</Nav>*/}
                {/*<span style={{color: 'white'}}>*/}
                {/*    /!*사업자번호:{authReducer.o_sNumber}*!/*/}
                {/*    /!*유저아이디:{authReducer.u_id}*!/*/}
                {/*    /!*유저{authReducer.isUser.toString()}*!/*/}
                {/*    /!*오너{authReducer.isOwner.toString()}*!/*/}
                {/*    /!*관리자{authReducer.isMaster.toString()}*!/*/}

                {/*{authReducer.isOwner.toString() === "true" ? authReducer.o_sNumber +  '점주님 반갑습니다.'*/}
                {/*    : null}*/}
                {/*{authReducer.isUser.toString() == "true" ? authReducer.u_id + " 님 반갑습니다."*/}
                {/*    : null}*/}
                {/*{authReducer.isMaster.toString() == "true" ? "관리자로 로그인 되었습니다."*/}
                {/*    : null}*/}
                {/*    {authReducer.isOwner === true || authReducer.isUser === true || authReducer.isMaster === true ? <Button onClick={logout}>로그아웃</Button> : null}*/}

                {/*</span>*/}


            </DivWrap>

        </>
    )
}
