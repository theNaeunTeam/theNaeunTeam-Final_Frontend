import React, {useRef} from "react";

import {Link} from 'react-router-dom';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import '../../lib/styles/nav.scss'


export default function OwnerNavbar() {
    const aaa = useRef(null);
    const bbb = useRef(null);

    const updatemenu = () => {
        if (aaa.current != null) {
            if ((aaa.current as HTMLInputElement).checked) {
                if (bbb.current) {
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
                    {/* 상품조회 예약현황 이용해지신청*/}
                </ul>
            </nav>
            {/*<React.Fragment>*/}

            {/*    /!* Sidebar *!/*/}

            {/*    <Navigation*/}
            {/*        activeItemId={location.pathname}*/}
            {/*        onSelect={({itemId}) => {*/}
            {/*            history.push(itemId)*/}
            {/*        }}*/}
            {/*        items={[*/}
            {/*            {*/}
            {/*                title: '대시보드',*/}
            {/*                itemId: `/owner`,*/}
            {/*                elemBefore: () => <AiFillSignal/>,*/}
            {/*                subNav:[*/}
            {/*                    {*/}
            {/*                        title : '매출현황',*/}
            {/*                        itemId : '/owner',*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        title:'판매',*/}
            {/*                        itemId:'/owner/ownerdashf',*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        title:'기타',*/}
            {/*                        itemId:'/owner/ownerdashs'*/}
            {/*                    }*/}
            {/*                ]*/}
            {/*            },*/}
            {/*            {*/}
            {/*                title : '상품등록',*/}
            {/*                itemId : '/owner/addproduct',*/}
            {/*                elemBefore: () => <AiOutlineAppstoreAdd/>,*/}
            {/*            },*/}
            {/*            {*/}
            {/*                title : '상품조회',*/}
            {/*                itemId : '/owner/goodsview',*/}
            {/*                elemBefore: () => <AiOutlineSearch/>,*/}
            {/*            },*/}
            {/*            {*/}
            {/*                title:'예약현황',*/}
            {/*                itemId : '/owner/reservationview',*/}
            {/*                elemBefore: () => <AiOutlineBarcode/>,*/}
            {/*            },*/}
            {/*            {*/}
            {/*                title: '이용해지신청',*/}
            {/*                itemId:'/owner/unsubscribe',*/}
            {/*                elemBefore: () => <AiOutlineUsergroupDelete/>,*/}
            {/*            }*/}

            {/*        ]}*/}
            {/*    />*/}


            {/*</React.Fragment>*/}
        </>


    )
}
