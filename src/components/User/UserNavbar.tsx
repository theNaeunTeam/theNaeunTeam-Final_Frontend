import React from "react";
import {Link} from 'react-router-dom';

// @ts-ignore
const Sidebar = ({width, height, children})=>{
    return(
        <div style={{width : width, height:height}}>
            <React.Fragment>{children}</React.Fragment>
        </div>
    )
};
export default function UserNavbar() {
    return (
        <>
                <Sidebar width={'100%'} height={'100%'}>
                    <h2><Link to={'/user'}>MyPage</Link></h2>
                    <h5><Link to={'/user/userreserve'}>예약내역</Link></h5>
                    <h5><Link to={'/user/favorstore'}>즐겨찾는가게</Link></h5>
                    <h5><Link to={'/user/useredit'}>회원정보수정</Link></h5>
                    <h5><Link to={'/user/userexit'}>회원탈퇴</Link></h5>
                </Sidebar>
        </>
    )
}
