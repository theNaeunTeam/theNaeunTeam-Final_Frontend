import React, {useRef} from "react";
import {Link, RouteComponentProps} from 'react-router-dom';
import '../../lib/styles/nav.scss'

export default function MasterNavbar(props: RouteComponentProps) {

    const navRef = useRef(null);
    const chkBoxRef = useRef(null);

    const updatemenu = () => {
        if (navRef.current != null) {
            if ((navRef.current as HTMLInputElement).checked) {
                if (chkBoxRef.current) {
                    (chkBoxRef.current as HTMLElement).style.borderBottomRightRadius = '0';
                    (chkBoxRef.current as HTMLElement).style.borderBottomLeftRadius = '0';
                }
            } else {
                if(chkBoxRef.current){
                    (chkBoxRef.current as HTMLElement).style.fontSize = '10';
                    // chkBoxRef.current.borderRadius = '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">10</font></font>px';
                }
            }
        }
    }


    return (
        <>
            <nav id='menu' ref={chkBoxRef}>
                <input type='checkbox' id='responsive-menu' ref={navRef} onClick={updatemenu}/><label></label>
                <ul>
                    <li><Link to={'/master'}>Home</Link></li>
                    <li><Link className='dropdown-arrow' to={'/master'}>점주/회원 관리</Link>
                        <ul className='sub-menus'>
                            <li><Link to={'/master'}>점주리스트 </Link></li>
                            <li><Link to={'/master/masteruserlist'}>회원리스트</Link></li>
                        </ul>
                    </li>

                    <li><Link className='dropdown-arrow' to={'/master/approvalwaiting'}> 가맹점 관리 </Link>
                        <ul className='sub-menus'>
                            <li><Link to={'/master/approvalwaiting'}>입점승인대기</Link></li>
                            <li><Link to={'/master/approvalcompletion'}>입점승인완료</Link></li>
                            <li><Link to={'/master/terminationwaiting'}>해지승인대기</Link></li>
                            <li><Link to={'/master/terminationcompletion'}>해지승인완료</Link></li>
                        </ul>
                    </li>

                    <li><Link className='dropdown-arrow' to={'/master/masterchart'}> 통계 자료 </Link>
                        <ul className='sub-menus'>
                            <li><Link to={'/master/masterownerdash'}>오너현황</Link></li>
                            <li><Link to={'/master/userdash'}>유저현황</Link></li>
                            <li><Link to={'/master/masterchart'}>종합현황</Link></li>
                            <li></li>
                        </ul>
                    </li>
                    <li><Link to={'/master/changeBanner'}>배너변경</Link></li>
                </ul>
            </nav>
            <br/>
        </>
    )
}
