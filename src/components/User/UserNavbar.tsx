import React, {useState} from "react";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import '../../styles/nav.scss'

export default function UserNavbar() {
    const history = useHistory();
    const location = useLocation();


    return (
        <React.Fragment>
            {/* Sidebar */}
                <div className="flex items-center justify-center mt-10 text-center py-6" style={{textAlign:'center', padding:'10px'}}>
                      <span className="mx-2 text-2xl font-semibold text-black" >
                       <b>MYPAGE</b>
                      </span>
                </div>
                <Navigation
                    activeItemId={location.pathname}
                    onSelect={({itemId}) => {
                        history.push(itemId);
                    }}
                    items={[
                        {
                            title: 'MyPage 메인',
                            itemId: '/user'
                        },
                        {
                            title: '예약내역',
                            itemId: '/user/userreserve'
                        },
                        {
                            title: '즐겨찾는가게',
                            itemId: '/user/favorstore'
                        },
                        {
                            title: '회원정보수정',
                            itemId: '/user/useredit'
                        },
                        {
                            title: '탈퇴하기',
                            itemId: '/user/userexit'
                        }
                    ]}
                />


        </React.Fragment>
    )
}
