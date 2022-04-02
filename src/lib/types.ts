export interface cookieType {
    g_count: number,
    g_code: number,
    id: string,
    o_sNumber: string
}

export type cartReducerType = {
    g_code: number,
    g_count: number,
    g_name: string,
    g_status: number,
    g_price: number,
    g_discount: number,
    g_image: string,
    o_name: string,
    u_id: string,
}

export type ShoppingCartDTO = {
    g_code: number,
    g_count: number,
    g_name: string,
    g_status: number,
    g_price: number,
    g_discount: number,
    g_image: string,
    o_name: string,
    u_id: string,
}

export type masterMainType = {
    id: string,
    o_approval: number,
    o_sNumber: string,
    o_phone: string,
    o_name: string,
    o_cellPhone: string,
    o_address: string,
    o_latitude: string,
    o_longitude: string,
    o_date: string,
    o_time1: string,
    o_time2: string,
    o_image: string,
};

export type masterMainType2 = {
    id: string,
    o_approval: string,
    o_sNumber: string,
    o_phone: string,
    o_name: string,
    o_cellPhone: string,
    o_address: string,
    o_latitude: string,
    o_longitude: string,
    o_date: string,
    o_time1: string,
    o_time2: string,
    o_image: string,
};

export interface addProductType {
    isModify: boolean,
    g_owner: string,
    g_name: string,
    g_count: string,
    g_price: string,
    g_discount: string,
    g_detail: string,
    g_expireDate: string,
    g_category: string,
}

export type goodsViewType = {
    g_owner: string,
    g_code: number,
    g_name: string,
    g_count: number,
    g_price: number,
    g_discount: number,
    g_detail: string,
    g_image: string,
    g_expireDate: string,
    g_category: string,
    g_status: number,
    cnt: number,
};

export type ownerPageType = {
    o_name: string,
    total: number,
    monTotal: number,
    buyTotal: number,
}

export  type saleType = {

    date: string,
    sum: number,
    tal: number,

}


export interface ownerRegisterFormType {
    o_sNumber: string,
    o_pw: string,
    pwConfirm: string,
    o_phone: string,
    o_name: string,
    o_cellPhone: string,
    o_address: string,
    o_time1: string,
    o_time2: string,
    o_latitude: string,
    o_longitude: string,
}

export type reservationViewType = {
    r_g_code: number,
    r_code: number,
    r_u_id: string,
    r_count: number,
    r_firstTime: string,
    r_status: number,
    r_customOrder: string,
    r_firstDate: string,
    g_name: string,
    g_category: string,
    g_expireDate: string,
    g_count: number,
    g_status: number,
    selectedStatus: number,
};


export type shopViewType = {
    g_owner: string,
    g_code: number,
    g_name: string,
    g_count: number,
    g_price: number,
    g_discount: number,
    g_detail: string,
    g_image: string,
    g_expireDate: string,
    g_status: number,
    g_category: string,
};

export type userMyPageType = {
    u_id: string,
    save: number,
    u_point: number,
    reserve: number,
};

export type orderSubmitType = {
    r_firstDate: string,
    r_u_id: string,
    r_g_code: number,
    r_firstTime: string,
    r_count: number,
    r_customOrder: string,
    r_owner: string,
    r_pay: number,
}

export type orderFormType = {
    who: string,
    time: string,
    r_customOrder: string,
    payment: string,
    tumbler: string,
    kudasai: string,
    r_firstDate: string,
}

export type shopList = {
    distance: string,
    o_address: string,
    o_cellPhone: string,
    o_image: string,
    o_latitude: string,
    o_longitude: string,
    o_name: string,
    o_phone: string,
    o_sNumber: string,
    o_time1: string,
    o_time2: string,
    radius?: string,
    searchResult: number,
}

export type categoryType = {
    gagong: number,
    other: number,
    freeze: number,
    cooked: number,
    g_owner: string,
    fresh: number,
    drink: number,
}

export type carouselType = {
    src: string, altText: string, header: string, description: string, link: string,
}

export interface recommendType {
    g_owner: string,
    g_discount: number,
    g_image: string,
    g_name: string,
    g_price: number,
    o_name: string,
}

export type conType = {
    sum: number,
    tal: number,
}

export interface ownerFormErrorType {
    [index: string]: boolean;
}

export interface userFormType {
    [key: string]: boolean
}

export type dummyType = {
    r_g_code: number,
    r_code: number,
    r_u_id: string,
    r_count: number,
    r_firstTime: string,
    r_firstDate: string,
    r_status: number,
    r_customOrder: string,
    r_pay: number,
    g_name: string,
    g_category: string,
    g_expireDate: string,
    g_count: number,
    g_status: number,
};

export type favorListType = {
    o_name: string,
    o_address: string,
    o_time1: string,
    o_time2: string,
    o_phone: string,
    o_approval: number
    f_o_sNumber: string
}

export interface aboutStoreType {
    o_sNumber: string,
    o_approval: number,
    o_pw: string,
    token: string,
    o_phone: string,
    o_name: string,
    o_cellPhone: string,
    o_address: string,
    o_latitude: string,
    o_longitude: string,
    o_date: string,
    o_time1: string,
    o_time2: string,
    o_image: string,
}

export interface dispatchType {
    type: string | boolean,
    payload?: any,
}

export type shopBtnColor = {
    case1: boolean,
    case2: boolean,
    case3: boolean,
    case4: boolean,
    case5: boolean,
    case6: boolean,
    case7: boolean,
}
