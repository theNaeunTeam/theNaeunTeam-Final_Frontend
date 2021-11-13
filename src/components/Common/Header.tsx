import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';

export default function Header(props: RouteComponentProps) {

    const logout = () => {
        localStorage.removeItem('token');
        props.history.push('/');
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>공통헤더</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/'}>메인페이지</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/login'}>로그인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner'}>오너메인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master'}>마스터메인</Link></Nav.Link>
                    </Nav>
                    <Button onClick={logout}>로그아웃</Button>
                </Container>
            </Navbar>
        </>
    )
}
