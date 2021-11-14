import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IconButton} from "material-ui";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function UserMain() {

    return (
        <>
            <h1>유저 메인 페이지</h1>
            <div>
            </div>
            <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
            </IconButton>
        </>
    )
}
