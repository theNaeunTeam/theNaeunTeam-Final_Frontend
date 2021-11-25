import React from "react";

import {Link} from 'react-router-dom';
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
                <NavItem> 대시보드
                    <ol>
                        <NavItem><Link to={'/owner'}>매출현황</Link></NavItem>
                        <NavItem><Link to={'/owner/ownerdashf'}>판매</Link></NavItem>
                        <NavItem><Link to={'/owner/ownerdashs'}>기타</Link></NavItem>
                    </ol>
                </NavItem>
                <NavItem><Link to={'/owner/addProduct'}>상품등록</Link></NavItem>
                <NavItem><Link to={'/owner/goodsview'}>상품조회</Link></NavItem>
                <NavItem><Link to={'/owner/reservationview'}>예약현황</Link></NavItem>
                <NavItem><Link to={'/owner/sellingview'}>판매내역</Link></NavItem>
                <NavItem><Link to={'/owner/unsubscribe'}>이용해지신청</Link></NavItem>
            </ul>
        </Nav>

    )
}
