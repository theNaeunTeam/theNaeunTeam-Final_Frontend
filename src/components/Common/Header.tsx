import React from "react";
import styled from "styled-components";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import '../../lib/styles/Header.scss'
import LoginFormContainer from "../../containers/Common/LoginFormContainer";
import Backdrop from '@mui/material/Backdrop';
import ScrollToTop from "../../lib/ScrollToTop";

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

export default function Header() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {showLoginModal, authReducer} = useSelector((state: RootState) => state);

    const logout = () => {
        dispatch({type: 'logoutAll'});
        history.push('/');
    };

    const First = () => {
        return (
            <>
                <li onClick={() => dispatch({type: true})} style={{cursor: 'pointer'}}>
                    로그인
                </li>
                <li>
                    <Link style={{fontWeight: 'bold'}} to={'/user/register'}>회원가입</Link>
                </li>
                <li>
                    <Link style={{fontWeight: 'bold'}} to={'/owner/register'}>입점신청</Link>
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
                        <button onClick={logout} className={'button'}>로그아웃</button>
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
                <li><Link to={'/user/shoppingcart'}>장바구니</Link></li>
                <li>
                    <button onClick={logout} className={'button'}>로그아웃</button>
                </li>
            </>
        )
    }
    return (
        <>
            <Backdrop
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={showLoginModal}
            >
                {showLoginModal && <LoginFormContainer/>}
            </Backdrop>
            <ScrollToTop/>
            <DivWrap className='header'>
                <DivMaster>
                    <Link to={'/master'} style={{marginRight: '20px'}}>관리자 인증</Link>
                    <Link to={'/owner'}>가게 인증</Link>
                </DivMaster>
                <Info>
                    <UL>
                        {authReducer.isOwner === false && authReducer.isUser === false && authReducer.isMaster === false
                            ? <First/>
                            : <Login/>}
                    </UL>
                </Info>
            </DivWrap>

        </>
    )
}
