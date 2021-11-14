import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';
import {IconButton} from "material-ui";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function OwnerNavbar(props: RouteComponentProps) {


    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>유저 네브바</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/addproduct'}>상품등록</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/productview'}>상품조회</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/reservationview'}>예약현황</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/sellingview'}>판매내역</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/unsubscribe'}>이용해지신청</Link></Nav.Link>
                    </Nav>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </Container>
            </Navbar>
        </>
    )
}
