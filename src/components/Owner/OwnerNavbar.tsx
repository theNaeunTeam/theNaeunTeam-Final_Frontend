import React from "react";

import {Link} from 'react-router-dom';
import styled from 'styled-components'

// @ts-ignore
const Sidebar = ({width, height, children})=>{
    return(
        <div style={{width : width, height:height}}>
            <React.Fragment>{children}</React.Fragment>
        </div>
    )
};

export default function OwnerNavbar() {

    return (
        <>
            <Sidebar width={'100%'} height={'100%'}>
                <h5> 대시보드
                        <h5><Link to={'/owner'}>매출현황</Link></h5>
                        <h5><Link to={'/owner/ownerdashf'}>판매</Link></h5>
                        <h5><Link to={'/owner/ownerdashs'}>기타</Link></h5>
                </h5>
                <h5><Link to={'/owner/addProduct'}>상품등록</Link></h5>
                <h5><Link to={'/owner/goodsview'}>상품조회</Link></h5>
                <h5><Link to={'/owner/reservationview'}>예약현황</Link></h5>
                <h5><Link to={'/owner/unsubscribe'}>이용해지신청</Link></h5>
            </Sidebar>
        </>

    )
}
