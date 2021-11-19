import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';
import {IconButton} from "material-ui";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function UserNavbar(props: RouteComponentProps) {


    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>유저 네브바</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/user'}>MyPage</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/addproduct'}>예약내역</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/productview'}>회원정보수정</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/reservationview'}>회원탈퇴</Link></Nav.Link>
                    </Nav>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </Container>
            </Navbar>
        </>
    )
}
