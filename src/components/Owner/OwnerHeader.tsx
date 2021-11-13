import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';

export default function OwnerHeader(props: RouteComponentProps) {


    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>가게 헤더</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/addproduct'}>상품등록</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/productview'}>상품조회</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/reservationview'}>예약현황</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/sellingview'}>판매내역</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/unsubscribe'}>이용해지신청</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
