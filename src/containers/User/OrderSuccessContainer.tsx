import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {cartReducerType, orderFormType, orderSubmitType} from "../../lib/types";
import {useCookies} from "react-cookie";
import OrderSuccess from "../../components/User/OrderSuccess";


export default function OrderSuccessContainer() {

    const defaultValue = {
        who: '',
        time: '',
        r_customOrder: '',
        payment: '',
        tumbler: '',
        kudasai: '',
        r_firstDate: '',
    }

    const location = useLocation();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['cart']); // 건들지 말것
    const [orderForm, setOrderForm] = useState<orderFormType>(defaultValue);
    const [arr, setArr] = useState<orderSubmitType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartReducer, setCartReducer] = useState<cartReducerType[]>([]);

    useEffect(() => {
        if (location.state === undefined) {
            history.replace('/err');
        } else {
            const {
                orderForm,
                arr,
                cartReducer
            } = location.state as { orderForm: orderFormType, arr: orderSubmitType[], cartReducer: cartReducerType[] };
            setArr(arr);
            setOrderForm(orderForm);
            setCartReducer(cartReducer);
            setIsLoading(false);
            removeCookie('cart', {path: '/'});
            window.scrollTo({
                top: 0,
            });
        }
    }, []);

    return (
        <>
            {
                isLoading || <OrderSuccess cartReducer={cartReducer} history={history} orderForm={orderForm} arr={arr}/>
            }
        </>
    )
}