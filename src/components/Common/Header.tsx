import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import logo from '../../logo.svg';
import {RootState} from "../../index";

export default function Header() {

    const history = useHistory();
    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('ownerToken');
        localStorage.removeItem('masterToken');
        dispatch({type:'logoutAll'});
        history.push('/');
    };




    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <img src={logo} style={{height: '30px'}} alt="logo"/>
                    <Navbar.Brand>공통헤더(임시)</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/'}>메인페이지</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/login'}>로그인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/user'}>유저메인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner'}>오너메인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master'}>마스터메인</Link></Nav.Link>
                    </Nav>

                    <span style={{color: 'white'}}>
                        유저{authReducer.isUser.toString()}
                        오너{authReducer.isOwner.toString()}
                        관리자{authReducer.isMaster.toString()}
                    </span>

                    <Button onClick={logout}>로그아웃</Button>
                </Container>
            </Navbar>
        </>
    )
}
