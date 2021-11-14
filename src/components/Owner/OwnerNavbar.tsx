import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';

export default function OwnerNavbar(props: RouteComponentProps) {


    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>오너 네브바</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/owner'}>오너메인</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner/addProduct'}>상품등록</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner/goodsview'}>상품조회</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner/reservationview'}>예약현황</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner/sellingview'}>판매내역</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/owner/unsubscribe'}>이용해지신청</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
