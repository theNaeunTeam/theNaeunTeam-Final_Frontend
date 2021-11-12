import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>로고</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/login'}>로그인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner'}>오너메인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master'}>마스터메인</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
