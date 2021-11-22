import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';

export default function MasterNavbar(props: RouteComponentProps) {


    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>마스터 네브바</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Nav}><Link to={'/master'}>점주리스트 </Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master/masteruserlist'}>회원리스트</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master/approvalwaiting'}>입점승인대기</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master/approvalcompletion'}>입점승인완료</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master/terminationwaiting'}>해지승인대기</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master/terminationcompletion'}>해지승인완료</Link></Nav.Link>
                        <Nav.Link as={Nav}><Link to={'/master/masterdash'}>대시보드</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
