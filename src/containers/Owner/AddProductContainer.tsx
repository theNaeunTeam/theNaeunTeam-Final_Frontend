import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {client} from "../../lib/api/client";
import {Slide,} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {useHistory} from "react-router-dom";
import {addProductType} from "../../lib/types";
import AddProduct from "../../components/Owner/AddProduct";
import {useSweetAlert} from "../../lib/useSweetAlert";


// 등록알림창
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddProductContainer() {
    const fileDiv = useRef(null);
    const {fireSweetAlert} = useSweetAlert();
    const {goodsReducer, authReducer} = useSelector((state: RootState) => state);
    const history = useHistory();

    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const twoWeekLater = new Date(year, month, day + 14);

    const initValue = {
        isModify: false,
        g_owner: '',
        g_name: '',
        g_count: '',
        g_price: '',
        g_discount: '',
        g_detail: '',
        g_expireDate: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`,
        g_category: '마실것',
    };

    const dispatch = useDispatch();

    const fileInputTag = useRef<HTMLInputElement>(null);

    const [productForm, setProduct] = useState<addProductType>(initValue);
    const [loading, setLoading] = useState(false);

    const [g_name, setG_name] = useState(false);
    const [g_count, setG_count] = useState(false);
    const [g_price, setG_price] = useState(false);
    const [g_discount, setG_discount] = useState(false);
    const [g_detail, setG_detail] = useState(false);
    const [g_expireDate, setG_expireDate] = useState(false);
    const [g_category, setG_category] = useState(false);

    useEffect(() => {
        setProduct({...productForm, ...goodsReducer, g_owner: authReducer.o_sNumber}); // 리듀서에 저장된 사업자번호 불러옴
        return () => {
            dispatch({type: 'modifyOK'});
        }
    }, []);

    useEffect(() => {
        fomValidate();
    }, [productForm])

    const fomValidate = (): boolean => {
        if (productForm.g_name == '') {
            setG_name(true);
            return false;
        }
        setG_name(false);

        if (Number(productForm.g_count) === 0) {
            setG_count(true);
            return false;
        }
        setG_count(false);

        if (productForm.g_category == '') {
            setG_category(true);
            return false;
        }
        setG_category(false);

        if (Number(productForm.g_price) === 0) {
            setG_price(true);
            return false;
        }
        setG_price(false);

        if (Number(productForm.g_discount) === 0) {
            setG_discount(true);
            return false;
        }
        setG_discount(false);
        if (productForm.g_expireDate == '') {
            setG_expireDate(true);
            return false;
        }
        setG_expireDate(false);

        return true;
    };

    /// 알림창
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        submitForm();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitForm = async () => {
        if (!fomValidate()) {
            fireSweetAlert({title: '제출 양식을 확인해주세요', icon: 'error'});
            return false;
        }

        if (!fileInputTag.current?.files || fileInputTag.current.files.length === 0) {
            if (fileDiv.current) (fileDiv.current as HTMLDivElement).style.border = '1px solid red';
            fireSweetAlert({title: '파일을 등록 해 주세요', icon: 'error'});
            return false;
        }

        setLoading(true)
        const URL = '/owner/addGoods'
        const formData = new FormData();

        let actionType = 'new';
        if (goodsReducer.isModify) actionType = 'update'
        formData.append('file', fileInputTag.current.files[0]);
        formData.append('g_code', goodsReducer.g_code);
        formData.append('g_owner', productForm.g_owner);
        formData.append('g_name', productForm.g_name);
        formData.append('g_count', productForm.g_count);
        formData.append('g_price', productForm.g_price);
        formData.append('g_discount', productForm.g_discount);
        formData.append('g_detail', productForm.g_detail);
        formData.append('g_expireDate', productForm.g_expireDate);
        formData.append('g_category', productForm.g_category);

        formData.append('actionType', actionType);

        try {
            const res = await client.post(URL, formData);

            const result = '';
            if (actionType === 'new') {
                fireSweetAlert({title: '상품 등록 완료되었습니다', icon: 'success'});
            } else {
                fireSweetAlert({title: '상품 수정 완료되었습니다', icon: 'success'});
                // history.replace('/owner/goodsview');
            }
            dispatch({type: 'modifyOK'});
            setProduct(initValue);
        } catch (e: any) {
            const err = e.response;
            if (err.status === 500) {
                fireSweetAlert({title: '서버 작동 중 에러가 발생했습니다.', text: '잠시 후 다시 시도 바랍니다.', icon: 'error'});

            } else if (err.status === 400) {
                fireSweetAlert({title: err.data.error, icon: 'error'});
            } else {
                alert('예상치 못한 에러로 인해 작업 실패하였습니다.\n잠시 후 다시 시도 바랍니다.');
            }
        }
        setLoading(false);
    };

    // 아이디값을 가져와서 state 값을 업데이트 해준다
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        setProduct({...productForm, [tagName]: (e.target as HTMLFormElement).value});
        // ownerFormValidate();
    };


    return (
        <AddProduct loading={loading} handleForm={handleForm} g_name={g_name} productForm={productForm}
                    g_count={g_count} g_category={g_category} setProduct={setProduct} g_price={g_price}
                    g_discount={g_discount} today={today} g_detail={g_detail} fileDiv={fileDiv}
                    fileInputTag={fileInputTag} g_expireDate={g_expireDate} goodsReducer={goodsReducer}
                    handleClickOpen={handleClickOpen} open={open} Transition={Transition} handleClose={handleClose}
                    twoWeekLater={twoWeekLater}/>
    )
}
