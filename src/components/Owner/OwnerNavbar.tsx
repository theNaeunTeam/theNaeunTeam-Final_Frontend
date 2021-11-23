import React from "react";

import {Link, RouteComponentProps} from 'react-router-dom';
import styled from 'styled-components'

const Nav = styled.nav`
  padding: 0px;
  margin: 0px;
  display: block;
`;

const NavItem = styled.li`
  
`;

export default function OwnerNavbar() {


    return (

            <Nav>
                <ul>
                    <li><Link to={'/owner'}>오너메인</Link></li>
                    <NavItem><Link to={'/owner/addProduct'}>상품등록</Link></NavItem>
                    <NavItem><Link to={'/owner/goodsview'}>상품조회</Link></NavItem>
                    <NavItem><Link to={'/owner/reservationview'}>예약현황</Link></NavItem>
                    <NavItem><Link to={'/owner/sellingview'}>판매내역</Link></NavItem>
                    <NavItem><Link to={'/owner/unsubscribe'}>이용해지신청</Link></NavItem>
                </ul>
            </Nav>

    )
}
