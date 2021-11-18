import React from 'react';
import {useCookies} from 'react-cookie';

export default function ShoppingCart() {
    const [cookies, setCookie] = useCookies(['cart']);

    return (
        <>
            {JSON.parse(cookies.cart)}
        </>
    )
}
