import React from "react";

import {Link} from 'react-router-dom';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import '../../lib/styles/nav.scss'
import FCM from "../../lib/FCM";


export default function OwnerNavbar() {

    return (
        <>
            <nav id='menu'>
                <ul>
                    <li>
                        <Link to={'/owner'} className='dropdown-arrow'>대시보드</Link>
                        <ul className='sub-menus'>
                            <li><Link to={'/owner'}>메인</Link></li>
                            <li><Link to={'/owner/ownerdashf'}>판매</Link></li>
                            <li><Link to={'/owner/ownerdashs'}>기타</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/owner/addproduct'}>상품등록</Link>
                    </li>
                    <li>
                        <Link to={'/owner/goodsview'}>상품조회</Link>
                    </li>
                    <li>
                        <Link to={'/owner/reservationview'}>예약현황</Link>
                    </li>
                    <li>
                        <Link to={'/owner/unsubscribe'}>이용해지신청</Link>
                    </li>
                </ul>
                <li><FCM/></li>
            </nav>
        </>


    )
}
