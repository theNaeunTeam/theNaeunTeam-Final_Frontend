import React, {useRef} from "react";
import '../../styles/nav.scss'
import {Link} from 'react-router-dom';
import logo from '../../styles/images/favicon.png'
import {IconButton} from "material-ui";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {AiFillEdit} from "react-icons/ai";
import {BiStore} from "react-icons/bi";

export default function MainBar() {
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
                <input type='checkbox' id='responsive-menu' onClick={updatemenu}/>
                <label>&nbsp;&nbsp;&nbsp;&nbsp; 메뉴</label>
                <ul>
                    <li><Link to={'/'}><img src={logo} style={{height: '20px'}} alt="logo"/>HOME</Link></li>
                    <li>
                        <Link to={'/list'}>
                            <BiStore/> 근처 가게 찾기
                        </Link>
                    </li>
                    <li><Link to={'/event'}>진행중인 이벤트</Link></li>
                    <li>
                        <Link to={'/tandaorder'}>탄다오더 소개 </Link>
                    </li>
                    <li><Link to={'/user'} className='dropdown-arrow'><AiFillEdit/> &nbsp; 마이페이지 </Link>
                        <ul className='sub-menus'>
                            <li><Link to={'/user/userreserve'}>예약 내역</Link></li>
                            <li><Link to={'/user/favorstore'}>즐겨찾는 가게</Link></li>
                            <li><Link to={'/user/useredit'}>회원정보수정</Link></li>
                            <li><Link to={'/user/userexit'}>탈퇴하기</Link></li>
                        </ul>
                    </li>
                    <li><Link to={'#'}>가맹안내</Link></li>
                    <li>
                        <Link to={'/user/shoppingcart'}>
                            <IconButton color="primary" aria-label="add to shopping cart">
                                <AddShoppingCartIcon/>
                            </IconButton>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}