import React, {useEffect, useState} from 'react';
import '../../lib/styles/UserMain.scss';
import {useHistory} from "react-router-dom";
import {carouselType, recommendType, shopList} from "../../lib/types";
import axios from "axios";
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import 'swiper/modules/scrollbar/scrollbar.scss'; // ScrollBar module
import 'swiper/modules/autoplay/autoplay.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import UserMain from "../../components/User/UserMain/UserMain"; // Autoplay module


export default function UserMainContainer() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<carouselType[]>([]);
    const [recommends, setRecommends] = useState<recommendType[]>([]);
    const history = useHistory();
    const {userLocalMap} = useSelector((state: RootState) => state);
    const [shopList, setShopList] = useState<shopList[]>([]);

    useEffect(() => {
        fetchBanner();
        fetchRecommendList();
        fetchLocalList();
    }, [userLocalMap]);

    const fetchBanner = () => {
        const URL = '/common/banner';
        axios.get(URL)
            .then(res => {
                setItems(res.data)
                setLoading(false);
            })
            .catch(err => {
                alert('페이지 초기화 실패');
            })
    }

    const fetchRecommendList = () => {
        const URL = '/common/recommendList';
        axios.get(URL)
            .then(res => {
                setRecommends(res.data);
                setLoading(false);
            })
            .catch(err => {
            })
    }
    const fetchLocalList = () => {
        if (userLocalMap.lat != 0 && userLocalMap.lon != 0) {
            axios.get('/common/localList?LAT=' + userLocalMap.lat + '&LON=' + userLocalMap.lon)
                .then(res => {
                    setShopList(res.data);
                    setLoading(false);
                })
                .catch(err => {

                })
        } else {

        }
    }

    return (
        <UserMain loading={loading} items={items} shopList={shopList} recommends={recommends} history={history}/>
    )
}

