import React, {useRef} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, RouteComponentProps} from 'react-router-dom';
import '../../styles/nav.css'

export default function MasterNavbar(props: RouteComponentProps) {

    const aaa = useRef(null);
    const bbb = useRef(null);

    const updatemenu = () => {
        if (aaa.current != null) {
            if ((aaa.current as HTMLInputElement).checked) {
                if(bbb.current){
                    (bbb.current as HTMLElement).style.borderBottomRightRadius = '0';
                    (bbb.current as HTMLElement).style.borderBottomLeftRadius = '0';
                }
            } else {
                //@ts-ignore
                bbb.current.borderRadius = '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">10</font></font>px';
            }
        }
    }


    return (
        <>
            <nav id='menu'  ref={bbb}>
                <input type='checkbox' id='responsive-menu' ref={aaa} onClick={updatemenu}/><label></label>
                    <ul>
                        <li><a href='http://'>Home</a></li>
                        <li><a className='dropdown-arrow' href='http://'>Products</a>
                            <ul className='sub-menus'>
                                <li><Link to={'/master'}>점주리스트 </Link></li>
                                <li><Link to={'/master/masteruserlist'}>회원리스트</Link></li>
                            </ul>
                        </li>

                        <li><a className='dropdown-arrow' href='http://'>Services</a>
                            <ul className='sub-menus'>
                                <li><Link to={'/master/approvalwaiting'}>입점승인대기</Link></li>
                                <li><Link to={'/master/approvalcompletion'}>입점승인완료</Link></li>
                                <li><Link to={'/master/terminationwaiting'}>해지승인대기</Link></li>
                                <li><Link to={'/master/terminationcompletion'}>해지승인완료</Link></li>
                            </ul>
                        </li>

                        <li><a className='dropdown-arrow' href='http://'>통계자료</a>
                            <ul className='sub-menus'>
                                <li><Link to={'/master/masterownerdash'}>오너대시보드</Link></li>
                                <li><Link to={'/master/userdash'}>유저대시보드</Link></li>
                                <li><Link to={'/master/masterchart'}>유저+오너통합 대시보드</Link></li>
                                <li></li>
                            </ul>
                        </li>
                        <li><Link to={'/master/changeBanner'}>배너변경</Link></li>
                    </ul>
            </nav>
            <br/>
            {/*<Navbar>*/}
            {/*    <Container>*/}
            {/*        <Navbar.Brand>마스터 네브바</Navbar.Brand>*/}
            {/*        <Nav className="me-auto">*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master'}>점주리스트 </Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/masteruserlist'}>회원리스트</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/approvalwaiting'}>입점승인대기</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/approvalcompletion'}>입점승인완료</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/terminationwaiting'}>해지승인대기</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/terminationcompletion'}>해지승인완료</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/masterownerdash'}>오너대시보드</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/userdash'}>유저대시보드</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/masterchart'}>유저+오너통합 대시보드</Link></Nav.Link>*/}
            {/*            <Nav.Link as={Nav}><Link to={'/master/changeBanner'}>배너변경</Link></Nav.Link>*/}
            {/*        </Nav>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}
        </>
    )
}
