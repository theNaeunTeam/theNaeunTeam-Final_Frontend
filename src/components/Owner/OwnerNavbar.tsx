import React from "react";

import {useHistory, useLocation} from 'react-router-dom';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {AiFillSignal,AiOutlineAppstoreAdd,AiOutlineSearch,AiOutlineBarcode,AiOutlineUsergroupDelete} from 'react-icons/ai'
export default function OwnerNavbar() {
    const history = useHistory();
    const location = useLocation();

    return (
        <React.Fragment>

            {/* Sidebar */}

            <Navigation
                activeItemId={location.pathname}
                onSelect={({itemId}) => {
                    history.push(itemId);
                }}
                items={[
                    {
                        title: '대시보드',
                        itemId: `/owner`,
                        elemBefore: () => <AiFillSignal/>,
                        subNav:[
                            {
                                title : '매출현황',
                                itemId : '/owner',
                            },
                            {
                                title:'판매',
                                itemId:'/owner/ownerdashf',
                            },
                            {
                                title:'기타',
                                itemId:'/owner/ownerdashs'
                            }
                        ]
                    },
                    {
                        title : '상품등록',
                        itemId : '/owner/addproduct',
                        elemBefore: () => <AiOutlineAppstoreAdd/>,
                    },
                    {
                        title : '상품조회',
                        itemId : '/owner/goodsview',
                        elemBefore: () => <AiOutlineSearch/>,
                    },
                    {
                        title:'예약현황',
                        itemId : '/owner/reservationview',
                        elemBefore: () => <AiOutlineBarcode/>,
                    },
                    {
                        title: '이용해지신청',
                        itemId:'/owner/unsubscribe',
                        elemBefore: () => <AiOutlineUsergroupDelete/>,
                    }

                ]}
            />



        </React.Fragment>
            
            
            
           


    )
}
