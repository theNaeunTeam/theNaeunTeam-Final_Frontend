import React, {useEffect, useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useCookies} from "react-cookie";
import {orderForm, orderSubmitType} from "../../lib/types";
import {client} from "../../lib/api/client";
import '../../lib/styles/order.scss';
import Order from "../../components/User/Order";

export default function OrderContainer() {
    const today = new Date();

    const defaultValue = {
        who: ' 제가 직접 받아요 ',
        time: '18:00',
        r_customOrder: '',
        payment: 'self',
        tumbler: '',
        kudasai: '',
        r_firstDate: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
    }

    const history = useHistory();

    const dispatch = useDispatch();
    const {cartReducer, authReducer} = useSelector((state: RootState) => state);
    const [orderForm, setOrderForm] = useState<orderForm>(defaultValue);
    const [cookies, setCookie, removeCookie] = useCookies(['cart']); // 건들지 말것


    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
        if (cartReducer[0] === undefined) history.replace('/err');
    }, []);

    useEffect(() => {
        return () => {
            dispatch({type: 'orderOut'});
            removeCookie('cart', {path: '/'});
        }
    }, []);

    const submitForm = () => {
        const URL = '/user/orderConfirm';

        const arr: orderSubmitType[] = [];

        for (let i = 0; i < cartReducer.length; i++) {
            const data: orderSubmitType = {
                r_firstDate: orderForm.r_firstDate,
                r_u_id: authReducer.u_id,
                r_g_code: cartReducer[i].g_code,
                r_firstTime: orderForm.time,
                r_count: cartReducer[i].g_count,
                r_customOrder: orderForm.who + orderForm.tumbler + orderForm.r_customOrder,
                r_owner: cookies.cart[0].o_sNumber,
                r_pay: cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0),
            }
            arr.push(data);
        }

        client.post(URL, arr)
            .then(res => {
                dispatch({type: 'orderOut'});
                // removeCookie('cart', {path: '/'});
                if (res.data === false) {
                    alert('노쇼 카운트 5 이상이므로 주문 불가능 합니다. ');
                } else {
                    alert('주문이 완료되었습니다');
                }
                history.push('/');
            })
            .catch(err => {
                alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
            })
    };

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {

        const tagName = (e.target as HTMLFormElement).id;

        if (tagName === 'kudasai' || tagName === 'tumbler') {
            if (!(e.target as HTMLFormElement).checked) (e.target as HTMLInputElement).value = '';
        }

        setOrderForm({...orderForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    return (
        <>
            <Order handleFormChange={handleFormChange} cartReducer={cartReducer} history={history} orderForm={orderForm}
                   today={today} submitForm={submitForm} o_sNumber={cookies.cart[0].o_sNumber}/>
        </>
    )
}
